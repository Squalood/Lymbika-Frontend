import { ChevronRight } from "lucide-react";

const HealthHubBanner = () => {
    return ( 
        <div className="max-w-4xl px-4 pb-10 lg:px-0 lg:pb-14 mx-auto">
            <a
              href="/"
              className="group relative flex flex-col w-full bg-cover bg-center rounded-xl hover:shadow-lg transition col-span-2 p-4 my-6"
              style={{ backgroundImage: `url("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=560&q=80")` }}
            >
              <div className="flex-auto p-8 md:p-6 text-white/90">
                <h3 className="text-xl  group-hover:text-white">
                Lymbika Health Hubs
                </h3>
                <span className="font-bold">Forma parte del nuevo ecosistema de salud en la frontera.</span> 
              </div>
              <div className="pt-0 p-4 md:p-6">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
                  Leer más
                  <ChevronRight size={20}/>
                </div>
              </div>
            </a>
        </div>
     );
}
 
export default HealthHubBanner;