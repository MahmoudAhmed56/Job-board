"use client"
import { forwardRef, useMemo, useState } from "react"
import { Input } from "./ui/input"
import citiesList from "@/lib/cities-list"

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  onLocationSelected:(location:string)=>void
}
const  LocationInput = forwardRef<
HTMLInputElement,
LocationInputProps
> (({onLocationSelected,...props},ref) => {
  const [locationSearchInput,setLocationSearchInput] = useState<string>("")
  const [hasFocus,setHasFocus] = useState<boolean>(false)
  const cities = useMemo(()=>{
    if(!locationSearchInput.trim())return[];
    const searchWords = locationSearchInput.split(" ")
    return citiesList.map(city=>`${city.name}, ${city.subcountry}, ${city.country}`)
    .filter(city=>
      city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
      searchWords.every(word=>city.toLowerCase().includes(word.toLowerCase()))
      )
      .slice(0,5)
  },[locationSearchInput])
  return (
    <div className="relative">
    <Input 
    placeholder="Search for a city..."
    type="search"
    onChange={(e)=>setLocationSearchInput(e.target.value)}
    onFocus={()=>setHasFocus(true)}
    onBlur={()=>setHasFocus(false)}
    {...props}
    ref={ref}
    />
    {locationSearchInput.trim() && hasFocus && (
      <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
        {!cities.length && <p className="p-3">No results found</p>}
        {cities.map(city=>(
          <button 
          onMouseDown={(e)=>{
            e.preventDefault()
            onLocationSelected(city)
            setLocationSearchInput("")
          }}
          className="block w-full p-2 text-start"
          key={city}>
            {city}
          </button>
        ))}
      </div>
    )}
    </div>
  )
})

export default LocationInput