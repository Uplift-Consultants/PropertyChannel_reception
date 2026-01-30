

export const customStyles = `
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  body { margin: 0; padding: 0; background: #f0f0f0; }
  
  
  .flier-container {
    width: 600px;
    height: 800px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .flier-container .img {
    position: relative;
    width: 100%;
    max-height: 454.5px;
    aspect-ratio: 4/3;
  }

  .flier-container .img .img_1 {
    width: 100%; 
    height: 100%; 
    object-fit: cover;
    object-position: center;
  }
  
  .flier-container .img .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.10) 80%, #0f1031 100%);
  }

   .flier-container .img .overlay .header {
      flex-grow: 1;
   }

   .flier-container .header .logo {
      position: absolute;
      padding: 8px;
      height: auto;
      width: 100px;
      right: 16px;
      top: 16px;
      border-radius: 12px; 
      background-color: #0f1031;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
   }

   .flier-container .header .badge {
      display: inline-flex;
      position: absolute;
      text-transform: capitalize;
      right: 16px;
      top: 110px;
      align-items: center;
      padding: 0 16px;
      height: 22px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 11px;
      color: #fff;
      background-color: #da1d2f;
   }

  .flier-container .img .overlay .footer {
    padding: 16px;
    z-index: 1000;
  }
  .flier-container .img .overlay .footer .price{
    padding: 10px 20px;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    background-color: rgba(0, 0, 38, 0.44);
    }

    .flier-container .content {
      flex-grow: 1;
      padding-left: 20px;
      padding-right: 20px;
      position: relative;
      background: #0f1031;

    }

    .flier-container .content .header {
      display: flex;
      margin: 12px 0;
      gap: 5px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .flier-container .content .header .dFlex {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .flier-container .content .header > .title {
      display: block;
      text-align: center;
      font-size: 1.65rem;
      text-transform: uppercase;
      color: #c69e42;
      width: 560px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .flier-container .content .header > .location {
      display: flex;
      algn-items: center;
    }
      
    .flier-container .content .header > .location span {
    font-size: 0.85rem;
      color: #cfcfd5;
    }


    .flier-container .content .features {
      display: flex;
      flex-direction: column;
      flex-grow: 1;    
    }

    .flier-container .content .features .title {
      font-weight: 600;
      margin: 14px 0;
    }

    .flier-container .content .features .featuresList {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .flier-container .content .featuresList .listItem {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 0.85rem;
      margin-left: 12px;
      margin-bottom: 10px;
    }

    .flier-container .content .featuresList li::marker {
      color: #c69e42;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .flier-container .wrapper {
      display: flex;
      margin: 10px;
    }

    .flier-container .imgList {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 10px;
    }

  .flier-container .imgList .listItem img {
      width: 120px;
      height: 95.5px;
      border-radius: 10px;
      border: 2px solid #c69e42;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      overflow: hidden;
      object-fit: cover; 
    }


    .flier-container > .footer {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      color: #000026;
      align-items: center;
      height: 40px;
      font-size: 0.85rem;
      font-weight: 600;
      background-color: #c69e42;
    }
      .flier-container > .footer span {
         display: flex;
         align-items: center;
         gap: 8px;
      }
      .flier-container > .footer span svg {
         fill: #000026;
      }
`;

export const getHtml = (data) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>${customStyles}</style>
    </head>
    <body>
      <div id="capture-target" class="flier-container">
        <div class="img">
          <div class="overlay">
            <div class="header">
              <span class="logo">
              ${LogoIcon}
              </span>  
              <span class="badge">${data.listingType}</span>                      
            </div>
            <div class="footer">
              <span class="price">$${data.price}</span>
            </div>
          </div>
          <img src="${data.img_1}" class="img_1" />
        </div>
        <div class="content">
          <div class="header">
            <span class="title">${data.title}</span>    
            <div class="location dFlex">
                <i class="icon location">${LocationIcon}</i>
                <span >${data.location}</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="features">
              <span class="title">FEATURES</span>
              <ul class="featuresList">
                <li class="listItem">
                  <i class="icon">${TickIcon}</i>
                  <span>${data.features[0] || ''}</span>                
                </li>
                <li class="listItem">
                  <i class="icon">${TickIcon}</i>
                  <span>${data.features[1] || ''}</span>                
                </li>
                <li class="listItem">
                  <i class="icon">${TickIcon}</i>
                  <span>${data.features[2] || ''}</span>                
                </li>
                <li class="listItem">
                  <i class="icon">${TickIcon}</i>
                  <span>${data.features[3] || ''}</span>                
                </li>
                <li class="listItem">
                  <i class="icon">${TickIcon}</i>
                  <span>${data.features[4] || ''}</span>                
                </li>
              </ul>          
            </div>   
            <div>
              <ul class="imgList">
                <li class="listItem">
                  <img src="${data.img_2}"/>
                
                </li> 
                <li class="listItem">
                  <img src="${data.img_3}"/>
                </li> 
              </ul>
            </div>        
          
          </div>

        </div>
        <div class="footer">
         <span class="agent">${data.agentName} | ${PhoneIcon} ${data.agentPhone}</span>
          <span class="website"><i class="icon location">${LocationIcon}</i> 14 Selous Ave, Harare</span>
        </div>
        
      </div>
    </body>
  </html>
`;