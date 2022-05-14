import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { IJob } from './../redux/types/jobTypes'
import Head from 'next/head'
import axios from 'axios'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import Filter from './../components/jobs/Filter'
import JobCard from './../components/jobs/JobCard'
import JobDetail from './../components/jobs/JobDetail'

interface IProps {
  data: IJob[]
}

const Jobs = ({ data }: IProps) => {
  const [selectedJob, setSelectedJob] = useState<Partial<IJob>>({})

  return (
    <>
      <Head>
        <title>Job Seek | Jobs</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <div className='w-full m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4'>
          <form className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
            <div className='flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
              <AiOutlineSearch className='text-xl text-gray-500' />
              <input type='text' placeholder='Job title or keyword' className='outline-0 h-full px-2 w-full text-sm' />
            </div>
            <div className='w-[1px] h-10 bg-gray-200 md:block hidden' />
            <div className='flex w-full items-center gap-3 md:mb-0 mb-4 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
              <IoLocation className='text-xl text-gray-500' />
              <input type='text' placeholder='Jawa Tengah' className='outline-0 h-full w-full text-sm px-2' />
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
          </form>
        </div>
      </div>
      <Filter />
      <div className='bg-gray-100 flex pt-10 pb-7 md:px-16 px-5 gap-8 h-[750px]'>
        <div className='flex-1 overflow-auto hide-scrollbar'>
          {
            data.map(item => (
              <JobCard key={item._id} item={item} onClick={() => setSelectedJob(item)} />
            ))
          }
        </div>
        <div className='flex-[2] bg-white rounded-md border border-gray-200 p-5 overflow-auto hide-scrollbar fixed top-0 right-0 bottom-0 left-[3000px] transition-all shadow-xl z-[999] md:z-auto md:static md:shadow-none'>
          {
            Object.keys(selectedJob).length > 0
            ? <JobDetail job={selectedJob as IJob} />
            : (
              <div className='flex items-center justify-center flex-col h-full gap-10'>
                <MdOutlineMapsHomeWork className='text-gray-400 text-9xl' />
                <p className='text-xl text-gray-500'>Select Job That Attract You To View The Detail</p>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobs

export const getServerSideProps: GetServerSideProps = async(context) => {
  const res = await axios.get(`${process.env.CLIENT_URL}/api/job/all`)

  return {
    props: {
      data: res.data.jobs
    }
  }
}