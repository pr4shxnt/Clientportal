'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getCommitdetails } from '@/app/store/slices/clientProjectSlice';
import { AppDispatch, RootState } from '@/app/store';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import Image from 'next/image';

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
      {dayWithSuffix} {month} { year !== todayYear ? `, ${year}` : ""}
    </>
  );
}

const GitActivity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gitCommits, loading, error } = useSelector((state: RootState) => state.git);

  useEffect(() => {
    dispatch(
      getCommitdetails({
        repo: 'clientportal',
        createdAt: '2025-03-17T00:00:00Z',
        page:1
      })
    );
  }, [dispatch]);

  // Defensive: ensure gitCommits is an array of commit objects
  const rows = Array.isArray(gitCommits)
    ? gitCommits.filter(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'date' in item &&
          'message' in item
      )
    : [];

  return (
    <div className="mb-8 mt-16">
      <h1 className="text-xl font-bold text-center mb-5">Git activity</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              col.key === "l" ? <TableHead className='hidden md:block' key={col.key}>{col.label}</TableHead> : <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={columns.length}>{error}</TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>No commits found.</TableCell>
            </TableRow>
          ) : (
            rows.map((row: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell><input type="checkbox" /></TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell >{row.message}</TableCell>
                <TableCell className=''><div className="flex items-center gap-3"><Image src={row.profilePicture} alt='' width={30} height={30} className='rounded-full'/> <p className="hidden md:block">{row.author || '-'}</p></div></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GitActivity;