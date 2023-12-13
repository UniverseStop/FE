import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import style from "./nav.module.css";

const Nav = () => {
    const router = useRouter();

    return (
        <div className={style.nav}>
            <Link href='/'>
                <div className='Nav-home'>
                    <svg width='30' height='30' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M14 38V24.3057C14 23.0451 15.0745 22.0233 16.4 22.0233H23.6C24.9255 22.0233 26 23.0451 26 24.3057V38M18.6091 2.42234L3.00914 12.9721C2.37603 13.4002 2 14.0933 2 14.8321V34.5764C2 36.4672 3.61178 38 5.6 38H34.4C36.3882 38 38 36.4672 38 34.5764V14.8321C38 14.0933 37.624 13.4002 36.9909 12.9721L21.3909 2.42234C20.5582 1.85922 19.4418 1.85922 18.6091 2.42234Z'
                            stroke='black'
                            stroke-width='2.5'
                            stroke-linecap='round'
                        />
                    </svg>
                </div>
            </Link>
            <div className='Nav-search'>
                <Link href='/search'>
                    <svg width='35' height='35' viewBox='0 0 46 47' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M32.4432 33.37L39.1 39.95M36.9534 22.4033C36.9534 30.8827 30.2257 37.7567 21.9267 37.7567C13.6277 37.7567 6.90002 30.8827 6.90002 22.4033C6.90002 13.9239 13.6277 7.05 21.9267 7.05C30.2257 7.05 36.9534 13.9239 36.9534 22.4033Z'
                            stroke='black'
                            stroke-width='2.5'
                            stroke-linecap='round'
                        />
                    </svg>
                </Link>
            </div>
            <div className='Nav-post'>
                <Link href='/post'>
                    <svg width='34' height='34' viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <rect width='49' height='49' rx='10' fill='url(#paint0_angular_0_1)' />
                        <path
                            d='M12 24.5H37M24.5 12L24.5 37'
                            stroke='white'
                            stroke-width='1.5'
                            stroke-linecap='round'
                        />
                        <defs>
                            <radialGradient
                                id='paint0_angular_0_1'
                                cx='0'
                                cy='0'
                                r='1'
                                gradientUnits='userSpaceOnUse'
                                gradientTransform='translate(24.5 24.5) rotate(90) scale(24.5)'>
                                <stop stop-color='#BA5077' />
                                <stop offset='1' stop-color='#4A486E' />
                            </radialGradient>
                        </defs>
                    </svg>
                </Link>
            </div>
            <div className='Nav-chat'>
                <Link href='/chat'>
                    <svg width='32' height='32' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M9.12425 17.148V17M16.9985 17.148V17M24.8728 17.148V17M32.747 17C32.747 19.2641 32.2693 21.4166 31.4092 23.3623L32.75 32.7485L24.7069 30.7375C22.4284 32.0191 19.7988 32.75 16.9985 32.75C8.30085 32.75 1.25 25.6985 1.25 17C1.25 8.30152 8.30085 1.25 16.9985 1.25C25.6962 1.25 32.747 8.30152 32.747 17Z'
                            stroke='black'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </Link>
            </div>
            <div className='Nav-profile'>
                <Link href='/profile'>
                    <svg width='32' height='32' viewBox='0 0 34 39' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M2 33.3279C2 28.6357 5.63712 24.6391 10.5801 23.8996L11.0253 23.833C14.9834 23.2409 19.0166 23.2409 22.9747 23.833L23.4199 23.8996C28.3629 24.6391 32 28.6357 32 33.3279C32 35.3559 30.2461 37 28.0826 37H5.91742C3.75389 37 2 35.3559 2 33.3279Z'
                            stroke='black'
                            stroke-width='2.2'
                        />
                        <path
                            d='M25.75 9.65625C25.75 13.8847 21.8325 17.3125 17 17.3125C12.1676 17.3125 8.25004 13.8847 8.25004 9.65625C8.25004 5.42782 12.1676 2 17 2C21.8325 2 25.75 5.42782 25.75 9.65625Z'
                            stroke='black'
                            stroke-width='2.2'
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Nav;
