import { formatDate, truncate } from "@/lib/utils";
import { Post } from "@/store/types";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PostCard({
  title,
  slug,
  author,
  thumbnail,
  created_at,
}: Post) {
  const pathname = usePathname();

  const url =
    pathname === "/admin/posts"
      ? `/admin/posts/edit/${slug}`
      : `/posts/${slug}`;

  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
        <a className="relative block aspect-square" href={url}>
          <Image
            width={500}
            height={500}
            src={thumbnail}
            alt={`${title}-thumbnail`}
            className="object-cover w-full h-full"
          />
        </a>
      </div>
      <div className="">
        <div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight mt-5 dark:text-white">
            <a href={url}>
              <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                {truncate(title, 100, true)}
              </span>
            </a>
          </h2>
          <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <a href="/author/mario-sanchez">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-zinc-900" />
                </div>
                <span className="truncate text-sm">{author.name}</span>
              </div>
            </a>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time className="truncate text-sm" dateTime={created_at}>
              {formatDate(created_at)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
