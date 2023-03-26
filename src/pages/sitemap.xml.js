import { getAllPostIds } from "../lib/posts";
import { getAllProjectIds } from "../lib/projects";

function generateSiteMap(posts, projects) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
        </url>
        <url>
            <loc>${baseUrl}</loc>
        </url>
        ${
            posts.map(({ id }) => `
                <url>
                    <loc>${`${baseUrl}/blog/${id}`}</loc>
                </url>
            `).join('\n')
        }
        ${
            projects.map(({ id }) => `
                <url>
                    <loc>${`${baseUrl}/blog/${id}`}</loc>
                </url>
            `).join('\n')
        }
        </urlset>
    `.trim();
}

function SiteMap() {}
  
export async function getServerSideProps({ res }) {
    const postIds = getAllPostIds();
    const projectIds = getAllProjectIds();
    const sitemap = generateSiteMap(postIds, projectIds);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;