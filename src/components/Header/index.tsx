import { pageTitle } from '@/config'
import { useLocation } from 'react-router'

export default function Header() {
  const { pathname } = useLocation()
  // console.log(pathname);
  return <div>{pageTitle[pathname]}</div>
}
