import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../Product/ProductCard'
import { Backdrop, CircularProgress, Pagination } from '@mui/material'
import { findProducts } from '../../../state/customer/product/Action'

const CareShare = () => {
    const [isLoad, setIsLoad] = useState(false)
    const dispatch = useDispatch()
    const { customerProduct } = useSelector((store) => store)
    useEffect(() => {
        const data = {
            name: "",
            color: "",
            size: "",
            pageNumber: 1,
            category: "",
            lpage: "",
            collection: encodeURIComponent("Care & Share"),
            sort: "",
        }
        console.log("params: ", data)
        dispatch(findProducts(data))
    }, [])
    useEffect(() => {
        if (customerProduct.loading) {
            setIsLoad(true);
        } else {
            setIsLoad(false);
        }
    }, [customerProduct.loading]);
    const handleLoderClose = () => {
        setIsLoad(false);
    };
    return (
        <div>
            <div>
                <img src='https://media2.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/March2024/banner_vun1.png' />
            </div>

            <div className='text-center pt-10 px-[20rem]'>
                <p className='text-4xl font-bold'>VỀ CARE & SHARE BY COOLMATE</p>
                <a className=''>Coolmate cam kết dành 10% doanh thu từ sản phẩm “Care & Share” đóng góp vào quỹ để tổ chức các hoạt động thiện nguyện
                    dành cho trẻ em có hoàn cảnh khó khăn</a>
                <img className='px-10' src="https://mcdn.coolmate.me/image/March2024/mceclip0_28.png" alt="" />
            </div>

            <div className='grid grid-cols-2 gap-4 px-10 pt-20'>
                <div className='pl-10 items-center'>
                    <div className='flex space-x-10 items-center pb-10'>
                        <img className='w-[160px] h-auto' src='https://mcdn.coolmate.me/image/March2024/mceclip9_73.png' />
                        <p className='text-sky-600 text-xl font-semibold'>BỘ SƯU TẬP 2024</p>
                    </div>
                    <p className='text-6xl font-semibold'>GHÉP LÊN ƯỚC MƠ TỪ MẢNH LỤA VỤN</p>
                    <p className='py-10'>Sự gặp gỡ của những con người cùng chung ý tưởng giúp đời, giúp người và tạo nên những giá trị bền vững cho cộng đồng xã hội. Coolmate quyết hợp tác với Vụn Art để một phần tiếp sức thêm cho ước mơ cùng Vụn Art tạo thêm công ăn việc làm, mang đến cơ hội học nghề cho những người kém may mắn, đặc biệt là những người khuyết tật vẫn còn khả năng lao động.</p>
                    <img src="https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2024/mceclip8_44.png" alt="" />
                </div>
                <div className='flex px-10 items-center justify-end'>
                    <img className='w-[80%] h-auto' src="https://mcdn.coolmate.me/image/March2024/mceclip0_73.png" alt="" />
                </div>
            </div>
            <div className='pt-20'>
                <img src='https://media2.coolmate.me/cdn-cgi/image/width=1426,height=2100,quality=80,format=auto/uploads/March2024/mceclip3_84.png' />
            </div>

            <p className='text-center py-10 text-4xl font-bold'>CÁC SẢN PHẨM CỦA CARE & SHARE</p>

            <div className='px-20'>
                {/* Product grid */}
                <div className="lg:col-span-4">
                    <div className="grid grid-cols-4">
                        {customerProduct?.products?.content?.map((item) => (
                            <ProductCard item={item} />
                        ))}
                    </div>
                </div>
                {/* {backdrop} */}
                <section>
                    <Backdrop
                        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoad}
                        onClick={handleLoderClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </section>
            </div>
        </div>
    )
}

export default CareShare
