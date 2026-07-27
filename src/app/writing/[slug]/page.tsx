import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-4 font-[family-name:var(--font-display)] text-2xl font-medium" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-relaxed text-(--color-ink-dim)" {...props} />
  ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return notFound();
  }

  return (
    <article className="py-16">
      <Container className="max-w-2xl">
        <Link href="/writing" className="inline-flex items-center gap-1.5 text-sm text-(--color-ink-faint) hover:text-(--color-ink-dim)">
          <ArrowLeft size={14} /> All writing
        </Link>

        <header className="mt-6 mb-10 border-b border-(--color-border) pb-8">
          <p className="font-mono text-xs text-(--color-ink-faint)">
            {formatDate(post.date)} · {post.readingTime}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-(--color-border) px-2.5 py-0.5 font-mono text-[11px] text-(--color-ink-faint)">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </Container>
    </article>
  );
}
