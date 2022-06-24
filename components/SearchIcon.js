import Image from 'next/image'
import mypic from './images/search-24.png'
const SearchIcon = (props) => {
  return (
    <Image
      src={mypic}
      alt="Search"
      onClick={props.handleSearchClick}
      style={props.style}
    />
  )
}
export default SearchIcon;
