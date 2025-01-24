import React, { useEffect, useState } from "react";
import DynamicIcon from "@/helpers/DynamicIcon";

const SocialShare: React.FC<{
  socialName: string;
  className: string;
  pathname: string;
}> = ({ socialName, className, pathname }) => {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleCopyLink = async () => {
    if (!baseUrl) return;

    const fullLink = `${baseUrl}${pathname}`;
    try {
      await navigator.clipboard.writeText(fullLink);
      setIsTooltipVisible(true);
      setTimeout(() => setIsTooltipVisible(false), 1000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  if (!baseUrl) return null; // Evita renderizar antes de obtener la URL base

  return (
    <ul className={className}>
      {/* Facebook */}
      <li>
        <a
          aria-label={`Share on Facebook`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}${pathname}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <span className="sr-only">{socialName}</span>
          <DynamicIcon className="inline-block" icon={"FaFacebookF"} />
        </a>
      </li>

      {/* Twitter */}
      <li>
        <a
          aria-label={`Share on Twitter`}
          href={`https://twitter.com/intent/tweet?text=${baseUrl}${pathname}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <span className="sr-only">{socialName}</span>
          <DynamicIcon className="inline-block" icon={"FaXTwitter"} />
        </a>
      </li>

      {/* LinkedIn */}
      <li>
        <a
          aria-label={`Share on LinkedIn`}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}${pathname}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <span className="sr-only">{socialName}</span>
          <DynamicIcon className="inline-block" icon={"FaLinkedinIn"} />
        </a>
      </li>

      {/* Copy Link */}
      <li>
        <button
          type="button"
          onClick={handleCopyLink}
          className="cursor-pointer relative"
          aria-label="Copy Link"
        >
          <span className="sr-only">Copy Link</span>
          {isTooltipVisible && (
            <span className="text-xs absolute -right-16 text-text dark:text-darkmode-text whitespace-nowrap">
              <DynamicIcon
                className="inline-block text-green-500"
                icon={"FaLink"}
              />{" "}
              Copied!
            </span>
          )}
          <DynamicIcon className="inline-block" icon={"FaRegCopy"} />
        </button>
      </li>
    </ul>
  );
};

export default SocialShare;
