// https://learnnextjs.com/basics/getting-started

import Layout from './components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown';

const Index = (props) => (
  <Layout>
    <h2>My Blog</h2>
    <div className="markdown">
      <Markdown 
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content
        `}
      />
    </div>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      ul {
        padding: 0
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a: hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)

// http://www.tvmaze.com/api
Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log('Show data length fetched', data.length);

  return {
    shows: data
  }
}

export default Index