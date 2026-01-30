import { LogoIcon, LocationIcon } from '@icons/icons';


export const LuxuryDark = (data) => `

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    body { margin: 0; padding: 0;}

    .basic-flier {
      width: 720px;
      height: 720px;
      display: flex;
      flex-direction: column;
      font-family: 'Montserrat', sans-serif;
    }
    .basic-flier .img.wrapper {
      aspect-ratio: 4/3;
      width: 100%;
      max-height: 480px;
      position: relative;
      overflow: hidden
    }
    .basic-flier .img.wrapper img{
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-origin: center;
    }

    .basic-flier .img.wrapper .overlay {
      position: absolute;
      display: flex;
      flex-direction: column;
      inset: 0;
    }
    .basic-flier .img.wrapper .overlay .header {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      margin-bottom: auto;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 80%, rgba(0, 0, 0, 0.85));
    }
    .basic-flier .img.wrapper .overlay .footer {
      padding: 20px;
      display: flex;
      color: #fff;
    }


    .basic-flier .content {
      flex-grow: 1;
      padding: 20px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
          .basic-flier .content .price {
      padding: 10px;
      color: #fff;
      font-size: 1.75rem;
      margin: auto;
      font-weight: 400;
      background-color: #000026;
    }
    .basic-flier .content .listingType {
      font-weight: 400;
      margin: 0;
      text-transform: capitalize;
      text-align: center;
    }
    .basic-flier .content .title {
      display: block;
      text-align: center;
      font-size: 1.65rem;
      font-weight: 500;
      text-transform: uppercase;
      color: #c69e42;
      width: 560px;
      margin: 0 auto 10px auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .basic-flier .content .location {
      font-size: 0.8rem;
      color: grey;
      text-align: center;
      padding: 5px;
    }

    .basic-flier .content .agent {
      text-align: center;
      font-size: 0.95rem;
    }
  </style>


  <div id="capture-target" class="basic-flier">
    <div class="img wrapper">
      <img src="${data.images[0]}" />
      <div class="overlay">
        <div class="header">
          <i class="icon logo">${LogoIcon}</i>
        </div>
      </div>
    
    </div>
    <div class="content">
      <h1 class="listingType">${data.listingType}</h1>
      <div class="location">
        <i class-"location">${LocationIcon}</i>
        <span>${data.location}</span>     
      </div>
      <span class="title">${data.title}</span>
      <span class="price">${data.price}</span>


      <p class="agent">${data.agent.name} | ${data.agent.phone}</p>
    
    </div>

  </div>
`;