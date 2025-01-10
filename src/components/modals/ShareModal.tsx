"use client";
import React, { useState } from "react";
import FXModal from "./FXModal";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareModal = (urlData: any) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = urlData?.urlData;
  console.log("shareUrl", shareUrl);
;
  return (
    <div className="relative p-6">
      <FXModal
        title="Share Post"
        buttonText="➥"
        buttonClassName="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-2 px-2 rounded-full shadow-xl transition-all duration-500 transform hover:scale-105"
      >
        <div className="flex flex-col items-center gap-4 pt-2 w-full pb-2">
          {/* Share Buttons */}
          <div className="flex justify-center gap-4">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>

          {/* Copy to Clipboard */}
          <div className="mt-4 w-full text-center">
            <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
              <button className="px-4 py-2 bg-default-100 border rounded shadow hover:bg-default-200 transition">
                Copy Link
              </button>
            </CopyToClipboard>
            {copied && (
              <p className="text-green-500 mt-2 text-sm">
                Link copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </FXModal>
    </div>
  );
};

export default ShareModal;
