/* eslint-disable no-undef */
import React, { useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import useRouter from 'utils/useRouter';
import { ErrorHandler } from 'components';

const NODE_ENV = process.env.NODE_ENV;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

interface PagePros {
  title: string;
  description?: string;
  image?: string;
  children: any;
}

const Page = (props: PagePros) => {
  const { title, description = '', image, children } = props;

  const router = useRouter();
  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }
    //@ts-ignore
    if (window.gtag) {
      //@ts-ignore
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: router.location.pathname,
        page_name: title
      });
    }
  }, [title, router]);

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {image && <meta name="image" content={image} />}
      </Helmet>
      <ErrorHandler>{children}</ErrorHandler>
    </Fragment>
  );
};

export default Page;
