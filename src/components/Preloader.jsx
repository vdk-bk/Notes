// import { motion } from "framer-motion";

// export default function Preloader() {
//   const slideUp = {
//     initial: {
//       y: 0,
//     },
//     exit: {
//       y: "-100vh",
//       transition: { duration: 1, ease: [5, 0, 0.57, 1] },
//     },
//   };

//   return (
//     <motion.div
//       variants={slideUp}
//       initial="initial"
//       exit="exit"
//       className="h-screen w-screen z-[999] fixed top-0 left-0 bg-dark flex justify-center items-center"
//     >
//       <motion.p
//         className="font-bold tracking-tight"
//         transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Snehashihsh Gaiwkad @ NOTES APP
//       </motion.p>
//     </motion.div>
//   );
// }


import { motion } from "framer-motion";
import "./Preloader.css"

export default function Preloader() {
  const slideUp = {
    initial: {
      y: 0,
    },
    exit: {
      y: "-100vh",
      transition: { duration: 1, ease: [0.83, 0, 0.57, 1] },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="preloader"
    >
      <motion.p
        className="preloader-text"
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Snehashish Gaiwkad © NOTES APP
      </motion.p>
    </motion.div>
  );
}
