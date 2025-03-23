import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

import CountUp from '../components/CountUp';

const Highlight = () => {
    const conRef = useRef(null);
    const topicRef = useRef(null);
    const descRef = useRef(null);

    const highlights = [
        { 
            type: 'จุดเด่นของสาขา',
            topic: 'ความรู้ด้านเทคโนโลยีสารสนเทศและภาคปฏิบัติควบคู่กันไป',
            description: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์ที่มหาวิทยาลัยศรีปทุมมุ่งเน้นการเรียนรู้จากโจทย์จริงและการปฏิบัติที่สถานประกอบการจริงในการนำเอาเทคโนโลยี AIoT ไปใช้ ทำให้นักศึกษาได้รับประสบการณ์และความเชี่ยวชาญในการประยุกต์ใช้เทคโนโลยีในสถานการณ์จริง เพื่อเตรียมพร้อมให้กับการทำงานในอุตสาหกรรม 4.0 และส่งเสริมการพัฒนาเทคโนโลยีและอุตสาหกรรมให้ก้าวหน้าไปด้วยกันได้อย่างยั่งยืนในอนาคต',
            sub1: 'ปีที่ก่อตั้ง',
            sub2: 'จำนวนนักศึกษา',
            sub1_num: 2002,
            sub2_num: 1100,
        }
    ];

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: conRef.current,
                start: "top bottom",
                end: "bottom bottom",
                // markers: true,
                scrub: 1,
                ease: "power2.inOut"
            }
        }).fromTo(
            topicRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1 }
        ).fromTo(
            descRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1 }
        )
    }, [])

  return (
    <main ref={conRef} className='highlight-container'>
        {highlights.map((highlight, idx) => (
            <article key={idx} className='row highlight-box'>
                <section className="left-side col-md-9">
                    <span className='line-1'>
                        <h5 className='hashtag'>#</h5>
                        <h5 className='type'>{highlight.type}</h5>
                    </span>
                    <section className="topic-container">
                        <h1 ref={topicRef} className="topic">{highlight.topic}</h1>
                    </section>

                    <section className="desc-container">
                        <p ref={descRef} className="desc">{highlight.description}</p>
                    </section>
                </section>
                
                <section className="right-side col-md-3">
                    <span className='year-countup'>
                    <p className="sub1">{highlight.sub1}</p>
                        <CountUp
                            from={1500}
                            to={highlight.sub1_num}
                            separator=","
                            direction="up"
                            duration={.6}
                            className="count-up-text"
                        />
                        {" "} CE
                    </span>
                    <hr />
                    <span className='num-countup'>
                    <p className="sub2">{highlight.sub2}</p>
                        ~ {" "}
                        <CountUp
                            from={800}
                            to={highlight.sub2_num}
                            separator=","
                            direction="up"
                            duration={.6}
                            className="count-up-text"
                        />
                        {" "} Year
                    </span>
                </section>
            </article>
        ))}
    </main>
  )
}

export default Highlight