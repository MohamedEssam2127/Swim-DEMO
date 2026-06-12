import NormalCard from "../../normal card/normalCard";
import databaseIcon from "../../../assets/icons/database.svg";
import cancelIcon from "../../../assets/icons/cancel-02.svg";
import visibilityIcon from "../../../assets/icons/tv-01.svg";
import { useTranslation } from "../../../localization/i18n";

function Problems() {
  const { t } = useTranslation("home");

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="mb-8">
        <h2 className="uppercase text-center md:text-left rtl:md:text-right inline text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-primary-900 mb-10 md:mb-[60px] tracking-[1px] header transition-transform hover:scale-105 duration-500 relative z-20">
          {t("problems.title")}
        </h2>
        <span className="text-primary-300 ms-2 text-md inter">
          {t("problems.subtitle")}
        </span>
      </div>
      <div className="relative grid grid-cols-1 items-center md:grid-cols-2 gap-6 lg:block lg:h-[600px] mt-8 lg:mt-0">
        <div className="w-full lg:absolute lg:top-[20%] lg:left-0 rtl:lg:left-auto rtl:lg:right-0 lg:w-lg lg:z-0 hover:z-50 transition-all duration-300">
          <NormalCard
            title={t("problems.card1Title")}
            value={t("problems.card1Value")}
            subtext={t("problems.card1Subtext")}
            icon={databaseIcon}
          />
        </div>
        <div className="w-full lg:absolute lg:top-0 lg:left-[30%] rtl:lg:left-auto rtl:lg:right-[30%] lg:w-lg lg:z-10 hover:z-50 transition-all duration-300">
          <NormalCard
            title={t("problems.card2Title")}
            value={t("problems.card2Value")}
            subtext={t("problems.card2Subtext")}
            icon={databaseIcon}
          />
        </div>
        <div className="w-full lg:absolute lg:top-48 lg:left-[40%] rtl:lg:left-auto rtl:lg:right-[40%] lg:w-lg lg:z-20 hover:z-50 transition-all duration-300">
          <NormalCard
            title={t("problems.card3Title")}
            value={t("problems.card3Value")}
            subtext={t("problems.card3Subtext")}
            icon={cancelIcon}
          />
        </div>
        <div className="w-full lg:absolute lg:top-[20%] lg:right-10 rtl:lg:right-auto rtl:lg:left-10 lg:w-lg lg:z-0 hover:z-50 transition-all duration-300">
          <NormalCard
            title={t("problems.card4Title")}
            value={t("problems.card4Value")}
            subtext={t("problems.card4Subtext")}
            icon={visibilityIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default Problems;
