import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getContracts, getContract } from '@/Services/ApiEndPoints';
import { APICALL } from '@/Services/ApiServices';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { FiDownload } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import Translation from '@/Translation';
import customAlert from '@/atoms/customAlert';
const itemsPerPage = 5;

const MyContractsMain = ( props ) => {
  const { entityType, entityId, t } = props;
  const headers = ['Employer', 'Company', 'Planning date', 'Actions'];
  const [ state, setState ] = useState({
    currentItems: [],
    filterRows: [],
    pageCount: 0,
    itemOffset: null,
    currentPage: 0,
    searchTermCompany: '',
    searchTermEmployer: '',
    searchTermPlanning: '',
  })


  const handleSearchClick = (search = 1) => {
    let filterRows = [];
    let { searchTermEmployer = '', searchTermCompany = '', searchTermPlanning = '',  overviewData: data } = state;
    if(search && (searchTermEmployer || searchTermCompany || searchTermPlanning)) {
      filterRows = data.filter((item) => {
        let status = true;
        if(searchTermEmployer)
          status = `${item['employer_name']}`.toLowerCase().toString().indexOf(searchTermEmployer.toLowerCase().toString()) !== -1;
        if(status && searchTermCompany)
          status = `${item['company_name']}`.toLowerCase().toString().indexOf(searchTermCompany.toLowerCase().toString()) !== -1;
        if(status && searchTermPlanning)
          status = `${item['planning_date']}`.toLowerCase().toString().indexOf(searchTermPlanning.toLowerCase().toString()) !== -1;
       return status;
      })
    } else {
      filterRows = data;
      searchTermEmployer = '';
      searchTermCompany = '';
      searchTermPlanning = '';
    }
    setState({ ...state,
      searchTermEmployer,
      searchTermCompany,
      searchTermPlanning,
      filterRows: filterRows,
      currentPage: 0,
      itemOffset: 0,
      ...updatePaginationData(filterRows, 0)
    });
  }

  useEffect(() => {
    const getData = async () => {
      await APICALL.service(`${getContracts}/${entityType}/${entityId}`, 'GET')
      .then(response => {
        if(response.status === 200) {
          setState({...state,
            overviewData: [...response.data || []],
            filterRows: response.data || [], itemOffset: 0 })
        }
      }).catch(error => console.error(error));
    }
    if(entityId && entityType)
        getData();
  }, [])


  const getNeededActions = (eachRow) => {
    return (
      <>
        <span title={'View'} className="actions-span text-dark" onClick={() => downloadContract(eachRow)}> <GrView /> </span>
      </>
    )
  }


  //------------------- Pagination code -------------------------//
  //-------------------
     useEffect(() => {
       if(state.itemOffset !== null) {
         setState({...state, ...updatePaginationData(state.filterRows, state.itemOffset || 0)})
       }
     }, [state.itemOffset]);

     const updatePaginationData = (filterRows, offset) => {
       let items = [...filterRows];
       const endOffset = offset + itemsPerPage;
       return {
         currentItems: items.slice(offset, endOffset),
         pageCount: Math.ceil(items.length / itemsPerPage)
       };
     }

     const handlePageClick = (event) => {
       let items = [...state.filterRows];
       const newOffset = (event.selected * itemsPerPage) % items.length;
       setState({...state, itemOffset: newOffset, currentPage: event.selected});
     };
  //------------------- Pagination code -------------------------//
  //-------------------

  let downloadContract = ({ contract_id }) => {
    if(contract_id) {
      APICALL.service(getContract + contract_id, 'GET')
      .then((result) => {
        if (result.status == 200) {
            let returnPath = result.data.data || '';
            window.open(returnPath, '_blank');
        }
      }).catch(error => console.log(error));
    } else {
      customAlert('error', 'Contract id not found', 2000);
    }
  }

    return (
      <>
      <div className='py-4 position-sticky-pc'>
      <h4 className='font-weight-bold  bitter-italic-normal-medium-24 px-0'> {`My contracts`} </h4>
      </div>
      <div className='searchbox m-0 pb-4 pt-2 position-sticky-contracts' style={{ margin: '10px 0' }}>
       <div className='row'>
       <div className='col-md-7 col-lg-9'>
         <div className='row'>
           <div className='col-md-4'>
                 <input
                     type="text"
                     className='form-control mt-2 mb-2 rounded-0 shadow-none'
                     // style={{margin: '10px 0'}}
                     value={state.searchTermEmployer}
                     name = {'employer_name'}
                     onChange={(e) => setState({...state, searchTermEmployer: e.target.value,searchColumn:'employer_name'})}
                     onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                     placeholder={t('Search employer')}
               />
                 </div>
                     <div className='col-md-4'>
                     <input
                     type="text"
                     className='form-control mt-2 mb-2 rounded-0 shadow-none'
                     // style={{margin: '10px 0'}}
                     name = {'company_name'}
                     value={state.searchTermCompany}
                     onChange={(e) => setState({...state, searchTermCompany: e.target.value,searchColumn:'company_name'})}
                     onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                     placeholder={t('Search company ')}
                 />
           </div>
           <div className='col-md-4'>
                 <input
                     type="text"
                     className='form-control mt-2 mb-2 rounded-0 shadow-none'
                     // style={{margin: '10px 0'}}
                     value={state.searchTermPlanning}
                     name = {'planning_date'}
                     onChange={(e) => setState({...state, searchTermPlanning: e.target.value,searchColumn:'planning_date'})}
                     onKeyUp={(e) => e.key === 'Enter' ? handleSearchClick(1): null}
                     placeholder={t('Search date')}
               />
                 </div>
         </div>
       </div>
       <div className='col-md-5 col-lg-3'>
         <div className='row'>
           <div className='col-md-6 col-lg-6'>
           <button
           type="button"
           className="btn  btn-block border-0 rounded-0 float-right mt-2 mb-2 skyblue-bg-color w-100 shadow-none"
           onClick={() => handleSearchClick(1)}
         >
           SEARCH
         </button>
           </div>
           <div className='col-md-6 col-lg-6'>
           <button
           type="button"
           className="btn border-0 btn-block rounded-0 float-right mt-2 mb-2 reset_skyblue_button w-100 shadow-none"
           onClick={() => handleSearchClick(0)}
         >
           RESET
         </button>
           </div>
         </div>
         </div>
       </div>
      </div>
      <div className="table-render-parent-div max-height-420 salary-benefit-table">
        <table className="table table-hover manage-types-table salary-benefits">
          <thead className="table-render-thead ">
            <tr className='btn-bg-gray-medium table-sticky-bg-gray py-2' key={'header-row-tr'}>{headers.map((eachHeader, index) => <th className='poppins-medium-18px justify-content-center btn-bg-gray-medium padding_first_col' key={`tablecol${index}`} scope="col"> {eachHeader} </th>)} </tr>
          </thead>
          {state.currentItems && state.currentItems.length > 0 ?
          <tbody>
            {state.currentItems.map(eachRow => <tr className='border poppins-regular-16px p-2' key={eachRow.sb_id} id={eachRow.sb_id}>
              <td className='poppins-regular-16px py-2  padding_first_col'> {eachRow.employer_name} </td>
              <td className='poppins-regular-16px'> {eachRow.company_name} </td>
              <td className='poppins-regular-16px'> {eachRow.planning_date} </td>
              <td className='poppins-regular-16px'> { getNeededActions(eachRow) } </td>
            </tr>)}
          </tbody>: <p className='poppins-regular-18px' style={{paddingTop: '10px'}}> No records </p>}
        </table>
      </div>
      <div>
        {state.filterRows.length > itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={state.pageCount}
            forcePage={state.currentPage}
            previousLabel={<AiOutlineArrowLeft />}
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            itemClass="page-item"
            linkClass="page-link"
            subContainerClassName={"pages pagination justify-content-center project-pagination"}
            activeClassName={"active"}
        />}
        <button onClick={() => router.push('/manage')} type="button" className="bg-white border-0 poppins-regular-18px text-decoration-underline text-uppercase float-sm-right mt-5 mb-2 ps-0">
          {t('Back')}
        </button>
      </div>
      </>
    )
}

export default React.memo(Translation(MyContractsMain,['Back']));
