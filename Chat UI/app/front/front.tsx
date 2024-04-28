"use client"
import React, { useEffect, useRef } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Navbar from '../Components/Navbar/Navbar'
import Typewriter from 'typewriter-effect'
import Footer from '../Components/Footer/Footer'
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import {motion, useInView} from 'framer-motion'
import './front.css'

const defaultAnimations = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const Front = () => {
    useEffect(() => {
        Aos.init();
    }, [])

    const ref = useRef(null);
    const isInView = useInView(ref, {amount: 0.5, once: true});
    const text = "Experience the power of MarathiGPT! Unlock creativity, automate tasks and supercharge your productivity. This Large Language Model in Marathi understands context, generates texts and solve problems. Our LLM is perfect for businesses, writers and developers. Try MarathiGPT and see how it transforms the way you work and create !"
  return (
    <div className='body'>
        <Navbar />
        <div className='flex flex-col mt-40 gap-3 h-screen'>
            <span className='text-center text-9xl'>
                <Typewriter 
                options={{
                    strings:[
                        "MarathiGPT",
                        "मराठीजीपीटी"
                    ],
                    autoStart: true,
                    loop: true,
                }}
                />
            </span>
            <span className='text-center text-3xl mt-5'>Your ultimate marathi companion for knowledge and discovery !</span>
            <div className='flex items-center justify-center mt-4'>
                <Link href='/chat'>
                <Button className='w-48 rounded flex gap-2 text-lg p-3' variant="outline">
                    Try MarathiGPT
                    <MoveUpRight size={20}/>
                </Button>
                </Link>
            </div>
        </div>
        <div className='h-screen'>
            <div data-aos="fade-up" data-aos-duration="500" className='flex items-center justify-center'>
                <span className='text-7xl p-5'>Try MarathiGPT</span>
            </div>
            <div className='mt-10 pr-24 pl-24 text-3xl tracking-wider text-center'>
                <span className='sr-only'>{text}</span>
                <motion.span ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ staggerChildren: 0.020 }} aria-hidden>
                {
                text.split(" ").map((word) => (
                    <span className='inline-block'>
                        {
                            word.split("").map((char) => (
                                <motion.span className='inline-block' variants={defaultAnimations}>
                                    {char}
                                </motion.span>
                            ))
                        }
                        <span className='inline-block'>&nbsp;</span>
                    </span>
                )
                )}
                </motion.span>
            </div>
        </div>
        <div className='h-screen'>
            <div data-aos="fade-up" data-aos-duration="500" className='flex items-center justify-center'>
                <span className='text-7xl'>Features</span>
            </div>
            <p className='mt-10 pr-16 pl-16 text-2xl tracking-wide'>

            </p>
        </div>
        <div className='h-screen'>
            <div data-aos="fade-up" data-aos-duration="500">
                <h1 className='text-center text-7xl'>Blog</h1>
            </div>
            <p className='mt-10 pr-24 pl-24 text-2xl tracking-wide'>
                Checkout our blog which describes how our LLM works in a greater detail.
                Learn more about our LLM <Link href='/blog'>here</Link>.
            </p>
        </div>
        <div className='h-screen'>
            <div data-aos="fade-up" data-aos-duration="500">
                <h1 className='text-center text-7xl'>Run Sample Colab Notebooks</h1>
            </div>
            <ul className='flex flex-col mt-20 gap-6 text-2xl pl-24 pr-24'>
                <li>Ready to use inference code</li>
                <li>Play around to test the model responses on a T4 GPU</li>
                <li>Integrate seamlessly into your projects</li>
            </ul>
        </div>
        <div className='h-screen'>
            <div data-aos="fade-up" data-aos-duration="500">
                <h1 className='text-center text-7xl'>Models</h1>
            </div>
            <div className='flex items-center gap-5 mt-28'>
                <p className='text-2xl text-center mt-5 pl-20 pr-16'>
                    Checkout our model on <Link href='/'>Huggingface</Link>
                </p>
                <Image src="/hf-logo.svg" height={900} width={900} alt="hf-logo" />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Front
