import { Link } from "react-router-dom";

export default function SaleSection(props) {
    return (
        <div className="bg-gradient-to-t from-[#2C3037] to-[#505F6E] mt-6">
            <div>
                <div className="flex px-[16px] py-[4px] w-full items-center text-[#c6d4df]">
                    <div className="border-b-2 p-[4px] mb-[4px] mr-[8px] whitespace-nowrap cursor-pointer text-[#fff]">All ITEMS</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP SELLERS</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP RATED</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>POPULAR UPCOMING</div>
                </div>
                <div>
                    {props.games ? 
                        <>
                            {props.games.map((game) => {
                                return (
                                    <div className="mb-[4px]">
                                        <div className="text-[#c6d4df] text-xs">
                                            <div className="h-[110px] relative">
                                                <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0 grid grid-cols-4 grid-rows-1	bg-gradient-to-tl from-[#42454c99] to-[#25282e66]">
                                                    <div className="h-[200px] p-1 ">
                                                        <Link>
                                                            <div className="relative w-full">
                                                                <img className="h-[102px] w-[219px] absolute top-0 bottom-0 left-0 right-0" src={game.image}/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="overflow-hidden pt-[8px] px-[12px] flex flex-col">
                                                        <div className="flex justify-between z-[1]">
                                                            <Link>
                                                                <div className="text-lg my-[2px] text-[#e5e5e5] uppercase font-thin text-left">{game.name}</div>
                                                            </Link>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="mt-[4px] mb-[4px] text-left h-[22px]">
                                                                {game.category.map((category) => {
                                                                    return (
                                                                        <Link className="px-[7px] text-[#a5b0b6] bg-[#708189]/[.15] mr-[2px] rounded-sm whitespace-nowrap text-sm inline-block">
                                                                            {category.name}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className="flex flex-col items-center justify-start mr-auto">
                                                                <div className="text-xs text-[#a5b0b6] flex items-center">
                                                                    {game.year}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-auto z-[1] absolute right-[7px] bottom-[4px] flex justify-end items-end min-h-[44px] text-lg">
                                                            <div className="flex flex-row-reverse items-center p-0">
                                                                <div className="bg-[#85a805]  h-[38px] text-center text-[#dfe3e6] rounded-sm whitespace-normal text-ellipsis py-[9px] px-[20px]">
                                                                    <span>Add to Cart</span>
                                                                </div>
                                                                <div className="flex h-[38px]">
                                                                    <div className="py-[5px] px-[8px] items-center text-lg bg-[#000000]/[.1]">{game.price}<span className="underline">đ</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    : null}
                </div>
            </div>
        </div>
    );
}