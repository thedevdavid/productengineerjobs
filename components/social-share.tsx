"use client";

import Link from "next/link";
import { Link as LinkIcon, Mail, ShareIos } from "iconoir-react";
import { siFacebook, siLinkedin, siX } from "simple-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url: string;
  text?: string;
}
export const SocialShare = ({ url, text }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ShareIos className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share Job</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siX.path}></path>
            </svg>
            Twitter (X)
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siFacebook.path}></path>
            </svg>
            Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-3 w-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={siLinkedin.path}></path>
            </svg>
            LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${encodedUrl}%20${text}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Mail className="mr-2 h-3 w-3" />
            Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div onClick={copyUrl}>
            <LinkIcon className="mr-2 h-3 w-3" />
            Copy Link
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
