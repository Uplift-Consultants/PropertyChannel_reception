import { PulseLoader } from "react-spinners";
import Skeleton from 'react-loading-skeleton';
import Image from "next/image";
import Link from "next/link";


export default function MobileView({data, isLoading, isSuccess }) {
    return (
<div className="properties">
    {isLoading && (
        <div className="splash-loader center">
            <PulseLoader color='#5021ff' size={18} />
        </div>
    )}

    {isSuccess && (
        <>
            {data.properties?.length === 0 ? (
                <div className="splash-loader center">No properties found.</div>
            ) : (
                data.properties.map((item) => (
                    <Link key={item._id} href={`/listings/${item._id}`} className="wrapper">
                        <div className="imgWrapper">
                            <Image 
                                src={item?.images?.[0]?.url || '/icon.svg'} 
                                alt="property" 
                                fill 
                                sizes="120px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="details">
                            <div className="title">
                                <span>{item.title || "Untitled Property"}</span>
                            </div>
                            <div className="location">{item.location || "No location provided"}</div>
                            <div className="price">
                                {item.price ? `$ ${item.price.toLocaleString()}` : <Skeleton width={60}/>}
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </>
    )}
</div>
    )
}