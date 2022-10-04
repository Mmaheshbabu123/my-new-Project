import React from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Pagination = (props) =>{
return (
    <div>
        <ReactPaginate
							breakLabel="..."
							nextLabel={props.itemOffset>0?<AiOutlineArrowRight />:<AiOutlineArrowRight />}
							onPageChange={props.handlePageClick}
							pageRangeDisplayed={2}
							marginPagesDisplayed={2}
							pageCount={props.pageCount}
							previousLabel={props.itemOffset>0?<AiOutlineArrowLeft />:<AiOutlineArrowLeft />}
							renderOnZeroPageCount={null}
							containerClassName={'pagination justify-content-center project-pagination align-items-center'}
							itemClass="page-item"
							linkClass="page-link"
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
    </div>
)



}

export default Pagination;