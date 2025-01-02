"use client"
import getData from '@/service/getData.mts'
import { ApiResponse } from '@/types/types'
import * as motion from "motion/react-client"
import { useEffect, useRef, useState } from 'react'

const box = {
    width: 70,
    height: 70,
    backgroundColor: "var(--bg-primary)",
    borderRadius: 5,
}

function Advice() {
    const [data, setData] = useState<ApiResponse>()
    const ref = useRef<HTMLDivElement>(null)


    useEffect(function () {
        const fetch = async () => {
            const data = await getData("https://api.adviceslip.com/advice")
            setData(data)
        }
        fetch()

        return function () {
            fetch()
        }
    }, [])



    return (
        <div className="hero h-4/5 p-6 " >
            <div className="flex flex-col items-center justify-center gap-5 bg-secondary rounded 
            shadow-lg w-full h-full shadow-inner" >
                <h1 className="text-5xl font-bold mt-8">Advice from big man:)</h1>
                <p>{data?.slip.advice}</p>


                <motion.div className='w-6/12 h-full' ref={ref}>
                    <motion.div
                        style={box}
                        whileHover={{ borderRadius: 50 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ scale: 1.5 }}
                        viewport={{ root: ref }}
                        drag
                        whileDrag={{ scale: 1.2, backgroundColor: "var(--bg-primary)" }}
                        dragConstraints={ref}
                        dragElastic={0.2}
                        animate={{
                            opacity: .6,
                            transition: { duration: 2, }
                        }}
                    />
                </motion.div>

            </div>
        </div >
    );
}

export default Advice;