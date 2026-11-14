import { useMemo, useState } from 'react';
import { Bookmark, Check, SlidersHorizontal, X } from 'lucide-react';
import type { NewsArticle, NewsTopic } from '../types/ride';
import { SafeImage } from './PlatformLogo';

interface PersonalizedNewsFeedProps {
  articles: NewsArticle[];
  preferredTopics: NewsTopic[];
  bookmarkedArticleIds: string[];
  onUpdateTopics: (topics: NewsTopic[]) => void;
  onToggleBookmark: (articleId: string) => void;
}

const ALL_TOPICS: NewsTopic[] = [
  'Platform Updates',
  'Fare & Promo Alerts',
  'ERP & Road Policy',
  'MRT & Transit',
];

export function PersonalizedNewsFeed({
  articles,
  preferredTopics,
  bookmarkedArticleIds,
  onUpdateTopics,
  onToggleBookmark,
}: PersonalizedNewsFeedProps) {
  const [activeFilter, setActiveFilter] = useState<'for-you' | 'saved' | NewsTopic>('for-you');
  const [showCustomize, setShowCustomize] = useState(false);
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  const visibleArticles = useMemo(() => {
    if (activeFilter === 'saved') {
      return articles.filter((a) => bookmarkedArticleIds.includes(a.id));
    }
    if (activeFilter === 'for-you') {
      if (preferredTopics.length === 0) return articles;
      const matching = articles.filter((a) => preferredTopics.includes(a.topic));
      return matching.length > 0 ? matching : articles;
    }
    return articles.filter((a) => a.topic === activeFilter);
  }, [articles, activeFilter, preferredTopics, bookmarkedArticleIds]);

  const toggleTopicPreference = (topic: NewsTopic) => {
    if (preferredTopics.includes(topic)) {
      if (preferredTopics.length === 1) return; // keep at least 1 topic selected
      onUpdateTopics(preferredTopics.filter((t) => t !== topic));
    } else {
      onUpdateTopics([...preferredTopics, topic]);
    }
  };

  return (
    <section id="news-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-[#0052CC] tracking-wide mb-1">
            Personalized Commuter Anchor
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Mobility news, fare shifts &amp; transit briefings
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
            Tailored briefings on Zig, Gojek, Tada, and Ryde policies, ERP timing changes, and airport pickup updates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomize((prev) => !prev)}
          className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#0052CC]" aria-hidden="true" />
          <span>Personalize Topics ({preferredTopics.length})</span>
        </button>
      </div>

      {/* Topic Personalization Drawer Inline */}
      {showCustomize && (
        <div className="mb-6 p-4 bg-white border border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-sm font-semibold text-slate-900">
              Select topics for your “For You” commuter feed:
            </span>
            <button
              type="button"
              onClick={() => setShowCustomize(false)}
              className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
            >
              Done
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_TOPICS.map((topic) => {
              const selected = preferredTopics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopicPreference(topic)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selected
                      ? 'bg-blue-50 border-blue-200 text-[#0052CC]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{topic}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Feed Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6" role="tablist" aria-label="News feed categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'for-you'}
          onClick={() => setActiveFilter('for-you')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeFilter === 'for-you'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          For You
        </button>
        {ALL_TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            role="tab"
            aria-selected={activeFilter === topic}
            onClick={() => setActiveFilter(topic)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === topic
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {topic}
          </button>
        ))}
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'saved'}
          onClick={() => setActiveFilter('saved')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeFilter === 'saved'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Saved ({bookmarkedArticleIds.length})
        </button>
      </div>

      {/* Articles Grid */}
      {visibleArticles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <p className="text-sm font-medium text-slate-700 mb-3">
            {activeFilter === 'saved'
              ? 'No saved articles yet. Bookmark any briefing to read offline later.'
              : 'No briefings currently posted under this topic.'}
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter('for-you')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0052CC] rounded-lg hover:bg-[#0041A3] cursor-pointer"
          >
            Return to For You Feed
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArticles.map((article) => {
            const isBookmarked = bookmarkedArticleIds.includes(article.id);
            return (
              <article
                key={article.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setReadingArticle(article)}
                    className="block w-full aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer text-left"
                  >
                    <SafeImage
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      fallbackTitle={article.topic}
                    />
                  </button>

                  <div className="p-5">
                    {/* Unboxed clean metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-[#0052CC]">{article.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedAgo}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      <button
                        type="button"
                        onClick={() => setReadingArticle(article)}
                        className="text-left hover:text-[#0052CC] transition-colors cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setReadingArticle(article)}
                    className="text-xs font-semibold text-[#0052CC] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Read Briefing
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(article.id)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Save article'}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'text-[#0052CC] bg-blue-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? 'fill-[#0052CC]' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Article Reader Modal */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto">
            <div className="relative aspect-[16/9] bg-slate-900">
              <SafeImage
                src={readingArticle.imageUrl}
                alt={readingArticle.imageAlt}
                className="w-full h-full object-cover"
                fallbackTitle={readingArticle.topic}
              />
              <button
                type="button"
                onClick={() => setReadingArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-[#0052CC]">{readingArticle.topic}</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.source}</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.publishedAgo}</span>
              </div>

              <h3 id="article-reader-title" className="text-2xl font-bold text-slate-900 leading-tight">
                {readingArticle.title}
              </h3>

              {/* Key Commuter Takeaways */}
              <div className="mt-5 p-4 bg-[#F7F9FC] border border-slate-200 rounded-xl">
                <div className="text-xs font-semibold text-slate-900 mb-2">Key Commuter Takeaways</div>
                <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-4">
                  {readingArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {readingArticle.bodyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onToggleBookmark(readingArticle.id)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedArticleIds.includes(readingArticle.id)
                        ? 'fill-[#0052CC] text-[#0052CC]'
                        : ''
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    {bookmarkedArticleIds.includes(readingArticle.id) ? 'Saved' : 'Save Briefing'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#0041A3] cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
