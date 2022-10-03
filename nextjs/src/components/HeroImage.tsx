const HeroImage = () => {

    return (
        <>
        {/* Background image */}
        <div className="p-5 text-center bg-image" style={{backgroundImage: 'url("https://wallpapercave.com/wp/p3HjAFU.jpg")', height: '540px', marginTop: '58px'}}>
            <div className="mask h-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white">
                    <h1 className="mb-3">Lorem Ipsum</h1>
                    <h4 className="mb-3">dolor sit amet, consectetur adipiscing elit</h4>
                    <a className="btn btn-outline-light btn-lg" href="#!" role="button">Random button</a>
                </div>
                </div>
            </div>
        </div>
        {/* Background image */}
        </>
    );

};

export default HeroImage;