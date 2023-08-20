"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          hero: {
            head: "One tool to manage your students Data, Attendance and Participation",
            desc: "Simplify Your Academic Record Keeping with DELEGUE The Ultimate Student Data and Attendance Solution",
            btn: "Start Now",
            download: "Download android app",
          },
          featureOne: {
            head: "Effortless Data Import",
            desc: "Import student information with ease by uploading Excel sheets directly into our platform. Watch as it transforms static data into an interactive database.",
          },
          featureTwo: {
            head: "Interactive Dashboards",
            desc: "Visualize and analyze attendance trends and academic performance with interactive dashboards. Make data-driven decisions to improve your teaching process.",
          },
          featureThree: {
            head: "Intuitive Data Organization",
            desc: "Say goodbye to scattered documents and spreadsheets. Our platform enables you to organize student data and attendance records in one centralized location.",
          },
          call: {
            calling: "Download application",
            head: "Get our free mobile app now",
            desc: "Access your student data and attendance records anytime, anywhere, with our mobile-friendly platform. Stay connected on the go.",
          },
        },
      },
      fr: {
        translation: {
          // here we will place our translations...
          hero: {
            head: "Un outil pour gérer les données, la fréquentation et la participation de vos élèves",
            desc: "Simplifiez votre dossier académique avec délégation les données ultimes des étudiants et la solution de fréquentation",
            btn: "Commencez maintenant",
            download: "Télécharger l'application Android",
          },
          featureOne: {
            head: "Importation de données sans effort",
            desc: "Importez facilement des informations sur les étudiants en téléchargeant des feuilles Excel directement dans notre plateforme.Regardez la transformation des données statiques en une base de données interactive.",
          },
          featureTwo: {
            head: "Tableaux de bord interactifs",
            desc: "Visualiser et analyser les tendances de fréquentation et les performances académiques avec des tableaux de bord interactifs.Prenez des décisions basées sur les données pour améliorer votre processus d'enseignement.",
          },
          featureThree: {
            head: "Organisation de données intuitives",
            desc: "Dites adieu aux documents dispersés et aux feuilles de calcul.Notre plateforme vous permet d'organiser les données des étudiants et les enregistrements de fréquentation dans un endroit centralisé.",
          },
          call: {
            calling: "Télécharger l'application",
            head: "Obtenez notre application mobile gratuite maintenant",
            desc: "Accédez à vos données d'étudiants et à vos enregistrements de fréquentation à tout moment, n'importe où, avec notre plate-forme adaptée aux mobiles.Restez connecté en déplacement.",
          },
        },
      },
      ar: {
        translation: {
          // here we will place our translations...
          hero: {
            head: "أداة واحدة لإدارة بيانات الطلاب والحضور والمشاركة",
            desc: "تبسيط السابق الأكاديمي الخاص بك مع بيانات الطالب النهائية للتفويض وحل الحضور",
            btn: "ابدأ الآن",
            download: "قم بتنزيل تطبيق Android",
          },
          featureOne: {
            head: "استيراد البيانات دون جهد",
            desc: "استيراد المعلومات بسهولة عن الطلاب عن طريق تنزيل أوراق Excel مباشرة في نظامنا الأساسي. طريق تحويل البيانات الثابتة إلى قاعدة بيانات تفاعلية.",
          },
          featureTwo: {
            head: "لوحات المعلومات التفاعلية",
            desc: "تصور وتحليل اتجاهات الحضور والأداء الأكاديمي مع لوحات المعلومات التفاعلية. ضع القرارات القائمة على البيانات لتحسين عملية التدريس الخاصة بك.",
          },
          featureThree: {
            head: "تنظيم البيانات البديهية",
            desc: "قل وداعًا للوثائق المشتتة وأوراق الحساب. يتيح لك منصتنا تنظيم سجلات الطلاب وسجلات الحضور في مكان مركزي.",
          },
          call: {
            calling: "قم بتنزيل التطبيق",
            head: "احصل على تطبيق الهاتف المحمول المجاني الآن",
            desc: "الوصول إلى طلابك وسجلات الحضور الخاصة بك في أي وقت ، لا يهم ، مع تكييف منصتنا مع الهواتف المحمولة.",
          },
        },
      },
    },
  });

export default i18n;
