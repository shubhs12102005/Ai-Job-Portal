import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { setSearchedQuery } from '@/Redux/jobSlice'
import { useDispatch } from 'react-redux'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "Machine Learning Engineer",
      "DevOps Engineer",
      "UI/UX Designer",
      "Graphic Designer",
      "Mobile App Developer",
      "Cloud Engineer",
      "Blockchain Developer"
    ]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="w-full bg-gray-900 text-gray-100 p-5 rounded-lg shadow-md border border-gray-800">
      {/* Heading */}
      <h1 className="font-bold text-xl mb-3 tracking-wide text-gray-50">Filter Jobs</h1>
      <hr className="border-gray-700 mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((group, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-lg text-[#a58bfa] mb-2 tracking-wide">
              {group.filterType}
            </h2>
            {group.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`
              return (
                <div key={itemId} className="flex items-center space-x-3 mb-2">
                  <RadioGroupItem 
                    id={itemId} 
                    value={item} 
                    className="border-gray-600 text-[#a58bfa] data-[state=checked]:bg-[#6A38C2]" 
                  />
                  <Label htmlFor={itemId} className="text-gray-300 cursor-pointer hover:text-[#a58bfa] transition-colors">
                    {item}
                  </Label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
