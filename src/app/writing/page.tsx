import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building AI tooling and developer infrastructure.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Section eyebrow="Writing" title="Notes from the build.">
      <div className="divide-y divide-(--color-border) border-t border-(--color-border)">
        {posts.map((post) => (
          <Link key={post.slug} href={`/writing/${post.slug}`} className="group block py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-medium group-hover:text-(--color-signal)">
                {post.title}
              </h2>
              <span className="font-mono text-xs text-(--color-ink-faint)">
                {formatDate(post.date)} · {post.readingTime}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-(--color-ink-dim)">{post.excerpt}</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="py-8 text-sm text-(--color-ink-faint)">
            No posts yet — add an .mdx file to src/content/writing.
          </p>
        )}
      </div>
    </Section>
  );
}
