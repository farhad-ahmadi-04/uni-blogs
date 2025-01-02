import getData from '@/service/getData.mts'

async function Advice() {
    const data = await getData("https://api.adviceslip.com/advice")


    return (
        <div className="hero h-4/5 p-6 ">
            <div className="flex flex-col items-center justify-center gap-5 bg-secondary rounded 
            shadow-lg w-full h-full shadow-inner">
                <h1 className="text-5xl font-bold">Advice from big man:)</h1>
                <p>{data.slip.advice}</p>
                <button className="btn btn-info">It&lsquo;s nothing...</button>
            </div>
        </div >
    );
}

export default Advice;