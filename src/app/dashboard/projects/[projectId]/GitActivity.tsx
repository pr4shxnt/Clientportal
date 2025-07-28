'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommitdetails } from '@/app/store/slices/clientProjectSlice';
import { AppDispatch, RootState } from '@/app/store';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const columns = [
  {},
  { key: 'date', label: 'Date' },
  { key: 'commit message', label: 'Commit Message' },
  { key: 'author', label: 'Author' },
];

function getDayWithSuffix(day: number) {
  if (day >= 11 && day <= 13) return <>{day}<sup>th</sup></>;
  switch (day % 10) {
    case 1: return <>{day}<sup>st</sup></>;
    case 2: return <>{day}<sup>nd</sup></>;
    case 3: return <>{day}<sup>rd</sup></>;
    default: return <>{day}<sup>th</sup></>;
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '-';
  const dayWithSuffix = getDayWithSuffix(date.getDate());
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const todayYear = new Date().getFullYear();

  return (
    <>
      {dayWithSuffix} {month} {year !== todayYear ? `, ${year}` : ''}
    </>
  );
}

const GitActivity = ({RepoName, RepoOwner}:{
  RepoName: string, RepoOwner: string
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { gitCommits, loading, error } = useSelector((state: RootState) => state.projects);

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if(RepoName && RepoOwner){
    dispatch(getCommitdetails({
      owner: RepoOwner,
      repo: RepoName,
      createdAt: '2025-03-17T00:00:00Z',
      page,
    }));}
  }, [dispatch, page, RepoName, RepoOwner]);

  const rows = Array.isArray(gitCommits)
    ? gitCommits.filter(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'date' in item &&
          'message' in item
      )
    : [];

  const handleNext = () => {
    if (rows.length === perPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="mb-8 mt-16 ">
      <h1 className="text-xl font-bold text-center mb-5">Git activity</h1>
      <Table className='min-h-[70vh]'>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              col.key === 'l' ? (
                <TableHead className="hidden md:block" key={i}>{col.label}</TableHead>
              ) : (
                <TableHead key={i}>{col.label}</TableHead>
              )
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell className='text-center' colSpan={columns.length}>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell className='text-center' colSpan={columns.length}>{error}</TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell className='text-center' colSpan={columns.length}>No commits found.</TableCell>
            </TableRow>
          ) : (
           <>
           {rows.map((row, idx) => (
  <TableRow key={idx}>
    <TableCell><input type="checkbox" /></TableCell>
    <TableCell>{formatDate(row.date)}</TableCell>
    <TableCell>{row.message}</TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <Image
          src={row.profilePicture}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="hidden md:block">{row.author || '-'}</p>
      </div>
    </TableCell>
  </TableRow>
))}

{/* Fill empty rows to always show 10 rows */}
{rows.length < perPage &&
  Array.from({ length: perPage - rows.length }).map((_, i) => (
    <TableRow key={`empty-${i}`}>
      <TableCell>&nbsp;</TableCell>
      <TableCell>&nbsp;</TableCell>
      <TableCell>&nbsp;</TableCell>
      <TableCell>&nbsp;</TableCell>
    </TableRow>
  ))
}

           </>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-4 gap-5">
        <button
          className="px-1 py-1 border rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handlePrev}
          disabled={loading || page === 1}
        >
          <ChevronLeft/>
        </button>
        <span>{page}</span>
        <button
          className="px-1 py-1 border rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleNext}
          disabled={loading || rows.length < perPage}
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default GitActivity;
