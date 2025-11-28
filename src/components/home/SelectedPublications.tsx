'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title = 'Selected Research', enableOnePageMode = false }: SelectedPublicationsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/research"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm px-3 py-1"
                >
                    View All →
                </Link>
            </div>

            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300"
                    >
                        <h3 className="text-lg font-serif font-bold text-primary mb-2 leading-tight">
                            {pub.title}
                        </h3>

                        {/* Author List with 'text-accent' to match links/bio */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            {pub.authors.map((author, idx) => {
                                // Check if the author is YOU
                                const isMe = author.name.includes("Gong") && author.name.includes("Chenyan");
                                
                                return (
                                    <span key={idx}>
                                        <span className={isMe ? 'text-accent' : ''}>
                                            {author.name}
                                        </span>
                                        {author.isCorresponding && (
                                            <sup className={`ml-0 ${isMe ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                        )}
                                        {idx < pub.authors.length - 1 && ', '}
                                    </span>
                                );
                            })}
                        </p>

                        {/* Journal Name with HTML support (for 'Accepted by' italics) */}
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-300">
                             <span dangerouslySetInnerHTML={{ __html: pub.journal || pub.conference || '' }} />
                             {pub.year ? ` ${pub.year}` : ''}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}