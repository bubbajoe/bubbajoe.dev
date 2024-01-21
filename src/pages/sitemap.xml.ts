import { getSortedBlogsMetadata } from "@/lib/blogs";
import { FileMetadata } from "@/lib/common";
import { getSortedProjectsMetadata } from "@/lib/projects";
import { GetServerSidePropsContext } from "next";

const deployDate = new Date().toISOString().split('T')[0];

function generateSiteMap(posts: FileMetadata[], projects: FileMetadata[]) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return '<?xml version="1.0" encoding="UTF-8"?>'+
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+
        `<url><loc>${baseUrl}</loc><lastmod>${deployDate}</lastmod></url>`+
        `<url><loc>${baseUrl}/blogs</loc><lastmod>${deployDate}</lastmod></url>`+
        `<url><loc>${baseUrl}/projects</loc><lastmod>${deployDate}</lastmod></url>`+
        posts.map(({ id, updated, created }) =>
            `<url><loc>${`${baseUrl}/blog/${id}`}</loc><lastmod>${updated || created || deployDate}</lastmod></url>`).join('\n')+
        projects.map(({ id, updated, created }) =>
            `<url><loc>${`${baseUrl}/projects/${id}`}</loc><lastmod>${updated || created || deployDate}</lastmod></url>`).join('\n')+
        '\n</urlset>'
}

function SiteMap() {}
  
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
    const blogData = await getSortedBlogsMetadata();
    const projectData = await getSortedProjectsMetadata();
    const sitemap = generateSiteMap(blogData, projectData);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;