import React from 'react';
import { Link } from '@mui/material';
import { useSearchParams } from "react-router-dom";

function CustomLink(props) {
  const { variant, to, searchPara } = props;
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Link variant={variant} href={`${to}?${search}`}>
      {props.children}
    </Link>
  );
}

export default CustomLink;