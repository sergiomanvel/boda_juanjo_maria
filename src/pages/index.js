import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Home() {

  /* START AUDIO */
  const audioRef = useRef(null);
  const [timeSound, setTimeSound] = useState(0);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4; // Set initial volume
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        setTimeSound(audio.currentTime);
        const progressBarFilled = document.querySelector(".progress-bar-filled");
        const progressThumb = document.querySelector(".progress-thumb");
        if (progressBarFilled && progressThumb) {
          const percentage = (audio.currentTime / audio.duration) * 100;
          progressBarFilled.style.width = `${percentage}%`;
          progressThumb.style.left = `${percentage}%`;
        }
      }
      );
      audio.addEventListener("ended", () => {
        setTimeSound(0);
        const progressBarFilled = document.querySelector(".progress-bar-filled");
        const progressThumb = document.querySelector(".progress-thumb");
        if (progressBarFilled && progressThumb) {
          progressBarFilled.style.width = "0%";
          progressThumb.style.left = "0%";
        }
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", () => { });
        audio.removeEventListener("ended", () => { });
      }
    };
  }
  , []);
  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = offsetX / rect.width;
        if (audioRef.current) {
          audioRef.current.currentTime = percentage * audioRef.current.duration;
        }
      });
    }
    return () => {
      if (progressBar) {
        progressBar.removeEventListener("click", () => { });
      }
    };
  }, []);
  useEffect(() => {
    const playButton = document.querySelector(".play-button");
    const pauseBars = document.querySelector(".pause-bars");
    if (playButton && pauseBars) {
      playButton.addEventListener("click", play);
      pauseBars.addEventListener("click", pause);
    }
    return () => {
      if (playButton && pauseBars) {
        playButton.removeEventListener("click", play);
        pauseBars.removeEventListener("click", pause);
      }
    };
  }, []);
  useEffect(() => {
    const handleTouchMove = (e) => {
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.touches[0].clientX - rect.left;
        const percentage = offsetX / rect.width;
        if (audioRef.current) {
          audioRef.current.currentTime = percentage * audioRef.current.duration;
        }
      }
    };
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  useEffect(() => {
    const handleTouchEnd = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      document.querySelector(".pause-bars").classList.add("active");
      document.querySelector(".play-button").classList.remove("active");
    }
  }
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      document.querySelector(".play-button").classList.add("active");
      document.querySelector(".pause-bars").classList.remove("active");
    }
  }

  /* END AUDIO */

  /* START CHILDREN */
  const [childrenCount, setChildrenCount] = useState(0);
  const handleChildrenChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 10) {
      setChildrenCount(value);
    }
  };
  useEffect(() => {
    const childrenDiv = document.getElementById("children");
    if (childrenCount > 0) {
      childrenDiv.innerHTML = "";
      childrenDiv.classList.remove("hidden");
      for (let i = 0; i < childrenCount; i++) {
        const div = document.createElement("div");
        div.className = "text-[#000] text-sm font-regular mb-1 ml-1";
        div.textContent = `NIÑO ${i + 1}:`;
        const childInput = document.createElement("input");
        childInput.type = "text";
        childInput.placeholder = `Ejemplo: Marta López`;
        childInput.className = "bg-[#9ec398] text-[#4f6f4a] text-sm w-full rounded-[25px] px-4 py-2 border-0 outline-0 focus:outline-1 mb-2";
        childrenDiv.appendChild(div);
        childrenDiv.appendChild(childInput);
      }
    } else {
      childrenDiv.innerHTML = "";
      childrenDiv.classList.add("hidden");

    }
  }, [childrenCount]);
  const handleChildrenYes = () => {
    const childrenInput = document.getElementById("childrenCount");
    childrenInput.disabled = false;
    childrenInput.value = 0; // Reset value to 0
    setChildrenCount(0); // Reset state
  };
  const handleChildrenNo = () => {
    const childrenInput = document.getElementById("childrenCount");
    childrenInput.disabled = true;
    childrenInput.value = 0; // Reset value to 0
    setChildrenCount(0); // Reset state
    const childrenDiv = document.getElementById("children");
    childrenDiv.innerHTML = ""; // Clear children inputs
  };
  /* END CHILDREN */
  // Add event listeners for children radio buttons and input
  useEffect(() => {
    const yesRadio = document.getElementById("children_yes");
    const noRadio = document.getElementById("children_no");
    const childrenInput = document.getElementById("childrenCount");

    if (yesRadio) yesRadio.addEventListener("change", handleChildrenYes);
    if (noRadio) noRadio.addEventListener("change", handleChildrenNo);
    if (childrenInput) childrenInput.addEventListener("input", handleChildrenChange);

    return () => {
      if (yesRadio) yesRadio.removeEventListener("change", handleChildrenYes);
      if (noRadio) noRadio.removeEventListener("change", handleChildrenNo);
      if (childrenInput) childrenInput.removeEventListener("input", handleChildrenChange);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="content relative">
        <audio
          ref={audioRef}
          src="/audio/contigo.mp3"
          loop
          className="hidden"
        />
        <img
          src={"/images/background/Sobre_Inicio.png"}
          alt="Sobre de inicio"
          className="absolute top-0 -z-1"
        />
        <h1 className="main-title mt-[270px] text-xl">¡NOS CASAMOS!</h1>
        <p className="subtitle text-6xl">
          Juanjo y María
        </p>
        <div className="hrVertical"></div>
        <img
          src={"/images/polaroid/1.png"}
          alt="Imagen de la boda 1"
          className="w-[300px] mx-auto"
        />
        <img
          src={"/images/background/Ilustracion_Division.png"}
          alt="Ilustración de división"
          className="mt-[-50px] -z-10"
        />
        <div className="info-container flex flex-col gap-3">
          <img
            className="w-[150px]"
            src={"/images/iconos/Recepcion_2.png"}
          />
          <img
            className="w-[150px] self-end "
            src={"/images/iconos/Ceremonia_2.png"}
          />
          <img
            className="w-[150px]"
            src={"/images/iconos/Celebracion_2.png"}
          />
          <img
            className="w-[150px] absolute left-[50%] -translate-x-1/2"
            src={"/images/iconos/Puntos_Itinerario_2.png"}
          />
          <img
            src={"/images/polaroid/2.png"}
            className="w-[400px] mx-auto"
          />
          <div className="audio-player w-[300px] mx-auto">
            <div className="play-button active" onClick={play}></div>
            <div className="pause-bars" onClick={pause}>
              <div className="pause-bar"></div>
              <div className="pause-bar"></div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-filled"></div>
              <div className="progress-thumb"></div>
            </div>
          </div>

          <div className="text-center text-2xl mt-4">
            <p className="text-[#513939] font-extralight text-lg">Lugar de la celebración</p>
            <p className="text-[#809e76] text-2xl font-semibold">Hotel Executive Sport Totana</p>
            <div className="ubicacion relative">

              <Link href={"https://maps.app.goo.gl/UpFNzqcamB92wkFD8"} target="_blank" className="text-[#fff] hover:text-[#5d7259] bg-[#809e76] hover:bg-[white] text-xl font-regular absolute bottom-15 left-[50%] -translate-x-1/2 px-8 py-2 transition-colors">
                Ver ubicación
              </Link>
            </div>
            <img
              src={"/images/iconos/Icon_quemepongo.png"}
              className="w-[200px] mx-auto mt-4"
            />
            <p className="text-[#809e76] text-4xl">¿Qué me pongo?</p>
            <p className="text-[#513939] font-extralight text-sm mt-2">Ni trajes, ni corbatas, ni vestidos ajustados, </p>
            <p className="text-[#513939] font-extralight text-sm">mejor cómods y bien despeinados. Y no</p>
            <p className="text-[#513939] font-extralight text-sm">preguntes a qué hora termina,</p>
            <p className="text-[#513939] font-semibold text-base">¡porque la fiesta sigue hasta que el sol ilumina!</p>

            <img
              src="/images/iconos/Icon_dalecagna.png"
              className="w-[200px] mx-auto mt-20"
            />
            <p className="text-[#809e76] text-4xl">¡Dale caña!</p>
            <p className="text-[#513939] font-light text-lg">¡Déjanos una recomendación para</p>
            <p className="text-[#513939] font-light text-lg">bailar hasta el amanecer!</p>
            <div className="recomendacion text-[#5e7259] bg-[#bed2b9] text-xs font-light p-4 m-7">
              <input type="text" id="musicaSugerencia" name="musicaSugerencia" className="w-full bg-[#bed2b9] text-[#5e7259] border-none outline-none" placeholder="Ejemplo: Mocatriz – Ojete calor/Espectacular – Fangoria, etc..." />
            </div>

            <img
              src="/images/iconos/Icon_sobre.png"
              className="w-[200px] mx-auto mt-20"
            />
            <p className="text-[#513939] font-extralight text-sm mt-2">Con vosotros queremos brindar, bailar,</p>
            <p className="text-[#513939] font-extralight text-sm">Reír y hasta llorar. Y si en algo queréis ayudar,</p>
            <p className="text-[#513939] font-extralight text-sm">esta es la cuenta para colaborar: </p>
            <p className="text-[#513939] font-semibold text-base">ES83 3023 0700 9873 3204 9605</p>
            <p className="text-[#809e76] text-4xl mt-3">¡Gracias!</p>

            <div className="mt-20 p-6 text-[#513939]">
              <div className="flex ">
                <div className="border-b-2 border-b-[#513939] w-[140px] h-7 mr-3"></div>
                <div className="font-base text-lg mt-2">Confirmación de asistencia</div>

              </div>
              <form className="formulario bg-[#bed2b9] p-5 text-left mt-2 relative" onSubmit={async (e) => {
                e.preventDefault();
                const musicaSugerencia = document.getElementById("musicaSugerencia").value;
                // Recoge otros campos del formulario aquí
                // Por ejemplo:
                const guestNames = document.getElementById("guestNames").value;
                const attendance = document.querySelector('input[name="attendance"]:checked')?.value;
                const children = document.querySelector('input[name="children"]:checked')?.value;
                const childrenCount = document.getElementById("childrenCount").value;
                const allergies = document.getElementById("allergies").value;
                // Aquí puedes construir el objeto a enviar
                const data = { guestNames, attendance, children, childrenCount, allergies, musicaSugerencia };
                await fetch("/api/invitados", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data)
                });
                // Opcional: mostrar mensaje de éxito o limpiar formulario
              }}>
                <div className="text-[#513939] text-sm font-light rombo">¿Nos acompañarás en este día tan especial?</div>
                <div className="radio-group flex gap-4 ml-5">
                  <div className="radio-option">
                    <input type="radio" id="attend_yes" name="attendance" value="yes" required/>
                    <label htmlFor="attend_yes" className="ml-2 text-lg">SI</label>
                  </div>
                  <div className="radio-option">
                    <input type="radio" id="attend_no" name="attendance" value="no" required/>
                    <label htmlFor="attend_no" className="ml-2 text-lg">NO</label>
                  </div>
                </div>
                <div className="text-[9px] font-light">* Tanto en respuesta afirmativa cómo negativa, por favor, indique su nombre...:</div>
                <input type="text" className="bg-[#8dad88] text-[#4f6f4a] text-sm w-full rounded-[25px] px-4 py-2 border-0 outline-0 focus:outline-1" placeholder="Ejemplo: Matías López y Larisa Martínez" id="guestNames" />

                <div className="text-[#513939] text-sm font-light rombo">¿Vendrán niños?</div>
                <div className="radio-group  flex gap-4 ml-5">
                  <div className="radio-option">
                    <input type="radio" id="children_yes" name="children" value="yes" required/>
                    <label htmlFor="children_yes" className="ml-2 text-lg">SI</label>
                  </div>
                  <input type="number" disabled className="bg-[#8dad88] text-[#4f6f4a] text-sm rounded-[5px] px-4 py-2 border-0 outline-0 focus:outline-1" value={childrenCount} min="0" max="10" id="childrenCount" />
                  <div className="radio-option">
                    <input type="radio" id="children_no" name="children" value="no" required/>
                    <label htmlFor="children_no" className="ml-2 text-lg">NO</label>
                  </div>
                </div>
                <div id="children" className="bg-[#d6edd1] rounded-[20px] p-5 mt-2">
                </div>
                <div className="text-[#513939] text-sm font-light rombo">¿Tiene algún alérgeno?</div>
                <div className="radio-group  flex gap-4 ml-5">
                  <div className="radio-option">
                    <input type="radio" id="allergies_yes" name="allergies" value="yes" required/>
                    <label htmlFor="allergies_yes" className="ml-2 text-lg">SI</label>
                  </div>
                  <div className="radio-option">
                    <input type="radio" id="allergies_no" name="allergies" value="no" required/>
                    <label htmlFor="allergies_no" className="ml-2 text-lg">NO</label>
                  </div>
                </div>
                <div className="text-[9px] font-light">* En caso de marcar "SI", por favor, especifique en el siguiente cuadro:</div>
                <input type="text" className="bg-[#8dad88] text-[#4f6f4a] text-sm w-full rounded-[25px] px-4 py-2 border-0 outline-0 focus:outline-1" placeholder="Ejemplo: Matías - Frutos secos..." id="allergies" />
                <button type="submit" className="btnSend cursor-pointer text-[#fff] hover:text-[#5d7259] bg-[#809e76] hover:bg-[white] text-sm font-light px-8 py-2 transition-colors absolute top-[97%] left-[50%] -translate-x-1/2">Enviar</button>
              </form>

            </div>
            <div className="text-left ml-5">
              <p className="rombo text-[#513939] text-sm font-light p-3"> Si vienes de lejos tenemos algunas opciones de alojamiento:</p>
              <span className="ml-8 text-lg">Hotel Executive Sport</span> <span className="font-extralight text-sm"> / <Link href={"tel:968418209"} className="">968 418 209</Link></span>
              <div className="ml-8 mb-3">
                <Link href={"https://maps.app.goo.gl/UpFNzqcamB92wkFD8"} target="_blank" className="btnUbi text-[#3e382e] hover:text-[#bed2b9] bg-[#bed2b9] hover:bg-[white] text-sm font-regular px-5 py-2 transition-colors">
                  Ver ubicación
                </Link>
              </div>
              <span className="ml-8 text-lg">Hotel Olimpia</span>
              <div className="ml-8">
                <Link href={"https://maps.app.goo.gl/c2Kv9RveUkFPGbRR8"} target="_blank" className="btnUbi text-[#3e382e] hover:text-[#bed2b9] bg-[#bed2b9] hover:bg-[white] text-sm font-regular px-5 py-2 transition-colors">
                  Ver ubicación
                </Link>
              </div>
            </div>
            <hr className="border-1 mt-5 mx-13" />
            <span className="text-sm ml-[-25px]">Código de descuento: <span className="font-extralight">BODA JUANJO Y MARIA</span></span>
          </div>
          <footer className="bg-[#e8e8e8] text-[#81827a] text-xs font-light py-2 mt-15">JUANJO & MARÍA</footer>
        </div>
      </div>
    </div>
  );
}
