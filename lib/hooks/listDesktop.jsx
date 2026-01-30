import { PulseLoader } from "react-spinners";
import Skeleton from 'react-loading-skeleton';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DesktopView({data, isLoading, isSuccess, handleShare}) {

  const router = useRouter();

    // 1. Handle Navigation the React way
    const handleRowClick = (id) => {
        router.push(`/listings/${id}`);
    };
    return (
        <div className="card">
        
                {isLoading && <div className="splash-loader center"><PulseLoader color='#5021ff' size={18} aria-label="Loading Spinner" data-testid="loader"/></div> }
                  <table>
                    <thead>
                      <tr>
                          <th className="img" >IMAGE</th>
                          <th>TITLE</th>
                          <th>CATEGORY</th>
                          <th>LOCATION</th>
                          <th>PRICE</th>
                          <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                      {isSuccess && Object.values(data.properties).length === 0 && !isLoading ? <div className="splash-loader center">No properties found.</div> :
                        isSuccess && Object.values(data.properties).map((item, index) => (
                          <tr className="listing" key={item._id} onClick={() => handleRowClick(item._id)}>
                            <td className="img">
                              <div className="imgWrapper" style={{width: "100px", aspectRatio: "4/3", position: "relative"}}>
                                <Image src={item?.images?.[0]?.url || '/icon.svg'} alt="property-image" fill={true} onError={(e) => { e.target.src = '/icon.svg'; }}/>
                              </div>
                            </td>
                            <td className="title">
                              <span>{item.title}</span>
                              <small className="reference">{item.reference}</small>
                              </td>
                            <td>{item.category || <Skeleton width={80}/>}</td>
                            <td>{item.location}</td>
                            <td>$ {item.price?.toLocaleString() || <Skeleton width={60}/>}</td>
                            <td>
                              {item?.ad?.website ?
                                <span className="status published">
                                  Published
                                </span>
                                :
                                <span className="status draft">
                                  Draft
                                </span>
                              } 
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
        </div>
    )
}