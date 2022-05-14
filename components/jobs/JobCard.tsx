import { useState, useEffect } from 'react'
import { IJob } from './../../redux/types/jobTypes'
import moment from 'moment'

interface IProps {
  item?: IJob
  isApplied?: boolean
  onClick?: () => void
}

const JobCard = ({ item, isApplied, onClick }: IProps) => {
  const [province, setProvince] = useState('')

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${item?.organization?.user.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }

    getProvinceData()
  }, [item?.organization?.user.province])

  return (
    <div onClick={onClick} className='bg-white rounded-md border border-gray-200 p-5 mb-3 cursor-pointer'>
      <div className='flex items-center gap-3 mb-7'>
        <div className='w-16 h-16 rounded-md bg-gray-200 shrink-0'>
          <img src={item?.organization?.user.avatar} alt={item?.organization?.user.name} className='w-full h-full rounded-md' />
        </div>
        <div>
          <p className='text-[#504ED7] text-lg'>{item?.position}</p>
          <p className='mt-1 text-xs'>{item?.organization?.user.name}</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <p className='text-xs bg-green-200 text-green-700 px-3 py-1 rounded-full'>Internship</p>
        <p className='text-xs bg-purple-200 text-purple-700 px-3 py-1 rounded-full'>Full Time</p>
      </div>
      <p className='mt-4 font-medium'>{province}</p>
      <div className='flex md:flex-row flex-col md:items-center md:justify-between'>
        {
          isApplied
          ? <p className='mt-2 text-gray-500 text-xs'>Applied At: 16 My 2022, 09:30 PM</p>
          : <p className='mt-2 text-gray-500 text-xs'>{moment(item?.createdAt).fromNow()}</p>
        }

        {
          isApplied &&
          <div className='text-sm bg-orange-500 w-fit text-white text-center py-2 px-4 rounded-md md:mt-0 mt-3'>
            On Review
          </div>
        }
      </div>
    </div>
  )
}

export default JobCard