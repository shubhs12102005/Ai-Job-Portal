import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { setSearchedQuery } from '@/Redux/jobSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Engineer",
    "DevOps Engineer",
    "Mobile App Developer",
    "iOS Developer",
    "Android Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Product Manager",
    "Project Manager",
    "Quality Assurance Engineer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "Database Administrator",
    "Blockchain Developer",
    "Game Developer",
    "Embedded Systems Engineer",
    "Network Engineer",
    "Business Analyst",
    "Software Engineer",
    "Technical Writer",
    "IT Support Specialist"
];


const CategoryCrousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='mt-12 w-full text-center text-gray-100'>

            {/* Section Heading */}
            <div className="mb-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    Explore Popular Job Categories
                </h2>
                <p className="text-gray-400 text-md md:text-lg">
                    Find roles tailored to your skills and interests — select a category to start browsing.
                </p>
            </div>

            <Carousel className="w-[70%] md:max-w-2xl mx-auto my-16">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/3">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline" className="rounded-full w-full" >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCrousel