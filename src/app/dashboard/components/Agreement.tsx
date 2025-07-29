"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../../../../node_modules/react-pdf/dist/Page/AnnotationLayer";
import "../../../../node_modules/react-pdf/dist/Page/TextLayer";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface AgreementProps {
  fileUrl: string;
}

const Agreement: React.FC<AgreementProps> = ({ fileUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateSizes = () => {
      if (parentRef.current && containerRef.current) {
        const parentHeight = parentRef.current.offsetHeight;
        setContainerHeight(parentHeight);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [isClient]);

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
  };

  if (!isClient) return null;

  return (
    <div ref={parentRef} className="parent px-4" style={{ height: "100%" }}>
      <div
        ref={containerRef}
        className="bg-white group relative rounded-md shadow flex justify-center items-center overflow-hidden"
        style={{ height: containerHeight || "auto", width: "auto" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 ease-in z-30" />

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in z-40" />

        {/* Text and Link */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in z-50 text-white">
          <h2 className="text-lg font-semibold mb-2">Agreement</h2>
          <Link href={fileUrl} target="_blank" className="underline">
            View
          </Link>
        </div>

        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Loading PDF..."
          error="Failed to load PDF."
        >
          {containerHeight > 0 && (
            <Page
              pageNumber={pageNumber}
              height={containerHeight}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )}
        </Document>
      </div>
    </div>
  );
};

export default Agreement;
