import React from 'react'

function IssueItem({ shortSummary }) {
  return (
    <div className="">
      <div className="px-[10px] py-[20px]">
        <p className=" text-[15px] leading-snug">{shortSummary}</p>
      </div>
    </div>
  )
}

export default IssueItem
