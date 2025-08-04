import React from 'react';

const DocumentUploadCard = ({
  title = "Agency Profile",
  description = "If the doc is available upload",
  state = "default", // default, uploaded, uploading, approved
  undoText,
  onClick,
  className = ""
}) => {
  const getCardStyles = () => {
    switch (state) {
      case "uploaded":
        return {
          container: "border-2 border-solid border-[#E6E6E6] bg-[#EBFFFF]",
          iconContainer: "border-[#079F9F] bg-white"
        };
      case "approved":
        return {
          container: "border-2 border-solid border-[#E6E6E6] bg-white",
          iconContainer: "border-[#E6E6E6] bg-white"
        };
      default:
        return {
          container: "border-2 border-dashed border-[#E6E6E6] bg-[#FBFBFB] hover:border-[#079F9F] hover:bg-[#F8FEFE]",
          iconContainer: "border-[#E0E0E0] bg-white"
        };
    }
  };

  const getIcon = () => {
    if (title === "Onboarding Approval") {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.3307 16.0013C29.3307 23.3651 23.3612 29.3346 15.9974 29.3346C8.6336 29.3346 2.66406 23.3651 2.66406 16.0013C2.66406 8.6375 8.6336 2.66797 15.9974 2.66797C20.359 2.66797 24.2315 4.76222 26.6641 8L27.9974 4.0013" stroke="#F8A63F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    if (state === "uploaded") {
      return (
        <div className="relative">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3333 29.3307L17.3333 23.9974C17.3333 21.0519 19.7211 18.6641 22.6667 18.6641L28 18.6641M4 23.9974L4 7.9974C4 5.05188 6.38782 2.66406 9.33333 2.66406L22.6667 2.66406C25.6122 2.66406 28 5.05188 28 7.9974V16.4549C28 17.8694 27.4381 19.226 26.4379 20.2262L18.8954 27.7686C17.8952 28.7688 16.5387 29.3307 15.1242 29.3307H9.33333C6.38781 29.3307 4 26.9429 4 23.9974Z" stroke="#079F9F" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[18px] left-[21px]">
            <path d="M11.6693 3.5L5.2526 9.91667L2.33594 7" stroke="#079F9F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    }

    if (state === "approved") {
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.3333 29.3337L17.3333 24.0003C17.3333 21.0548 19.7211 18.667 22.6667 18.667L28 18.667M4 24.0003L4 8.00033C4 5.05481 6.38782 2.66699 9.33333 2.66699L22.6667 2.66699C25.6122 2.66699 28 5.05481 28 8.00033V16.4579C28 17.8723 27.4381 19.2289 26.4379 20.2291L18.8954 27.7716C17.8952 28.7718 16.5387 29.3337 15.1242 29.3337H9.33333C6.38781 29.3337 4 26.9458 4 24.0003Z" stroke="#333333" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      );
    }

    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 24.0013L3 24.0013L4 24.0013ZM4 8.0013L5 8.0013L4 8.0013ZM9.33333 2.66797L9.33333 1.66797L9.33333 2.66797ZM22.6667 2.66797L22.6667 1.66797L22.6667 2.66797ZM28 8.0013L27 8.0013V8.0013H28ZM28 16.4588L29 16.4588V16.4588H28ZM15.1242 29.3346L15.1242 28.3346H15.1242V29.3346ZM9.33333 29.3346L9.33333 30.3346H9.33333V29.3346ZM26.4379 20.2301L25.7308 19.523L25.7308 19.523L26.4379 20.2301ZM18.8954 27.7725L19.6025 28.4796L19.6025 28.4796L18.8954 27.7725ZM17.3333 24.0013L16.3333 24.0013V24.0013H17.3333ZM22.6667 18.668L22.6667 17.668L22.6667 17.668L22.6667 18.668ZM11.2929 11.2942C10.9024 11.6847 10.9024 12.3179 11.2929 12.7084C11.6834 13.0989 12.3166 13.0989 12.7071 12.7084L11.2929 11.2942ZM14.1144 9.88692L14.8215 10.594L14.8215 10.594L14.1144 9.88692ZM17.8856 9.88692L17.1785 10.594L17.1785 10.594L17.8856 9.88692ZM19.2929 12.7084C19.6834 13.0989 20.3166 13.0989 20.7071 12.7084C21.0976 12.3179 21.0976 11.6847 20.7071 11.2942L19.2929 12.7084ZM17 9.33464C17 8.78235 16.5523 8.33464 16 8.33464C15.4477 8.33464 15 8.78235 15 9.33464H17ZM15 16.0013C15 16.5536 15.4477 17.0013 16 17.0013C16.5523 17.0013 17 16.5536 17 16.0013H15ZM4 24.0013L5 24.0013L5 8.0013L4 8.0013L3 8.0013L3 24.0013L4 24.0013ZM9.33333 2.66797L9.33333 3.66797L22.6667 3.66797L22.6667 2.66797L22.6667 1.66797L9.33333 1.66797L9.33333 2.66797ZM28 8.0013H27V16.4588H28H29V8.0013H28ZM15.1242 29.3346V28.3346H9.33333V29.3346V30.3346H15.1242V29.3346ZM26.4379 20.2301L25.7308 19.523L18.1883 27.0654L18.8954 27.7725L19.6025 28.4796L27.145 20.9372L26.4379 20.2301ZM15.1242 29.3346L15.1242 30.3346C16.8039 30.3346 18.4148 29.6674 19.6025 28.4796L18.8954 27.7725L18.1883 27.0654C17.3757 27.8781 16.2735 28.3346 15.1242 28.3346L15.1242 29.3346ZM28 16.4588L27 16.4588C27 17.6081 26.5435 18.7103 25.7308 19.523L26.4379 20.2301L27.145 20.9372C28.3327 19.7494 29 18.1385 29 16.4588L28 16.4588ZM4 8.0013L5 8.0013C5 5.60807 6.9401 3.66797 9.33333 3.66797L9.33333 2.66797L9.33333 1.66797C5.83553 1.66797 3 4.5035 3 8.0013L4 8.0013ZM4 24.0013L3 24.0013C3 27.4991 5.83553 30.3346 9.33333 30.3346L9.33333 29.3346L9.33333 28.3346C6.9401 28.3346 5 26.3945 5 24.0013L4 24.0013ZM22.6667 2.66797L22.6667 3.66797C25.0599 3.66797 27 5.60807 27 8.0013L28 8.0013L29 8.0013C29 4.5035 26.1645 1.66797 22.6667 1.66797L22.6667 2.66797ZM17.3333 29.3346H18.3333V24.0013H17.3333H16.3333V29.3346H17.3333ZM22.6667 18.668L22.6667 19.668L28 19.668L28 18.668L28 17.668L22.6667 17.668L22.6667 18.668ZM17.3333 24.0013L18.3333 24.0013C18.3333 21.6081 20.2734 19.668 22.6667 19.668L22.6667 18.668L22.6667 17.668C19.1689 17.668 16.3333 20.5035 16.3333 24.0013L17.3333 24.0013ZM12 12.0013L12.7071 12.7084L14.8215 10.594L14.1144 9.88692L13.4073 9.17981L11.2929 11.2942L12 12.0013ZM17.8856 9.88692L17.1785 10.594L19.2929 12.7084L20 12.0013L20.7071 11.2942L18.5927 9.17981L17.8856 9.88692ZM16 9.33464H15V16.0013H16H17V9.33464H16ZM14.1144 9.88692L14.8215 10.594C15.4724 9.94315 16.5276 9.94315 17.1785 10.594L17.8856 9.88692L18.5927 9.17981C17.1608 7.74789 14.8392 7.74789 13.4073 9.17981L14.1144 9.88692Z" fill="#079F9F"/>
      </svg>
    );
  };

  const styles = getCardStyles();

  return (
    <div
      className={`
        relative flex items-center justify-between w-full h-[126px] p-6
        ${styles.container}
        rounded-lg
        transition-all duration-200 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {/* Approved Status Badge */}
      {state === "approved" && (
        <div className="absolute top-0 right-0 bg-[#079F9F] text-white text-sm font-semibold px-5 py-1 rounded-br-lg rounded-tl-[12px]">
          Approved
        </div>
      )}

      <div className="flex flex-col justify-center flex-1">
        <h3 className="text-[#434343] font-medium text-lg leading-[27px] mb-1" style={{ fontFamily: 'Gilroy, -apple-system, Roboto, Helvetica, sans-serif' }}>
          {title}
        </h3>
        <div className="flex items-center gap-4">
          <p className="text-[#999999] text-sm leading-[21px]" style={{ fontFamily: 'Gilroy, -apple-system, Roboto, Helvetica, sans-serif' }}>
            {description}
          </p>
          {undoText && (
            <span className="text-[#078B8B] text-xs font-semibold underline">
              {undoText}
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 ml-4 relative">
        <div className={`w-14 h-14 rounded-lg border-2 ${styles.iconContainer} flex items-center justify-center`}>
          {getIcon()}
        </div>
        {state === "uploaded" && (
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 rounded-full bg-[#079F9F] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7581 5.8275L7.23404 13.3509C7.14698 13.438 7.04362 13.5071 6.92987 13.5542C6.81611 13.6013 6.69418 13.6256 6.57105 13.6256C6.44792 13.6256 6.32599 13.6013 6.21224 13.5542C6.09848 13.5071 5.99512 13.438 5.90806 13.3509L1.71158 9.13219C1.53607 8.95641 1.4375 8.71818 1.4375 8.46978C1.4375 8.22139 1.53607 7.98316 1.71158 7.80738L3.11783 6.40113C3.29304 6.22587 3.53052 6.12712 3.77833 6.12646C4.02615 6.1258 4.26415 6.22329 4.44029 6.39762L6.58716 8.46422L6.59361 8.47066L12.027 3.11695C12.2027 2.94198 12.4406 2.84375 12.6885 2.84375C12.9365 2.84375 13.1744 2.94198 13.3501 3.11695L14.7563 4.49742C14.8441 4.58444 14.9138 4.68796 14.9615 4.80203C15.0091 4.9161 15.0337 5.03847 15.0339 5.16209C15.0341 5.28571 15.0098 5.40815 14.9624 5.52235C14.9151 5.63654 14.8456 5.74025 14.7581 5.8275Z" fill="white"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadCard;
