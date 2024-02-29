import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

function AddImage({ postImage, setPostImage }: { postImage: File[]; setPostImage: (postImage: File[]) => void }) {
	const [imagePreview, setImagePreview] = useState<File[]>([]);
	const [isButtonDisabled, setIsButtonDisabled] = useState<Boolean>(true);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  	const handleMouseEnter = (index: number) => {
  	  setHoveredIndex(index);
  	};
 	 const handleMouseLeave = () => {
  	  setHoveredIndex(null);
 	 };

	  const handleDeleteImage = () => {
		if (hoveredIndex !== null) {
		  const updatedImagePreview = [...imagePreview];
		  updatedImagePreview.splice(hoveredIndex, 1);
		  setImagePreview(updatedImagePreview);
		  setIsButtonDisabled(!(updatedImagePreview.length >= 3));
		}
	  };


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (imagePreview.length >= 2) {
			setIsButtonDisabled(false);
		}

		const targetFiles = e.target.files as FileList;
		const selectedFiles: File[] = Array.from(targetFiles);
		for(let i=0; i<selectedFiles.length; i++) {
			let maxSize = 10 * 1024 * 1024;
			if(selectedFiles[i].size > maxSize) {
				alert("첨부파일 사이즈는 10MB 이내로 등록 가능합니다.")
				return;
			}
		}
		setImagePreview((prev) => [...prev, ...selectedFiles]);

		return;
	};

	useEffect(() => {
		setPostImage(imagePreview);
	  }, [imagePreview, setPostImage]);


	return (
		<div className="relative">
			<p className="text-2xl font-bold m-6 0 6 6">☝🏻표지에 쓰일 이미지를 골라주세요!</p>
			<div className="flex gap-3 ml-6">
					{imagePreview && imagePreview.map((file, i) => (
          			  <div key={i} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} >
            			  <img className="rounded-2xl object-cover h-36 w-36" src={URL.createObjectURL(file)} alt={`image${i}`}/>
           		     {hoveredIndex === i && (
						<div className="absolute top-[29%] flex justify-center items-center rounded-2xl h-36 w-36 bg-black bg-opacity-50">
                	    	<button onClick={handleDeleteImage}>
                 			   <FiTrash className="w-5 h-5 text-white"/>
                  		    </button>
                       </div>
             	     )}
            		  </div>
          			))}
					<label
						htmlFor="file"
						className={`flex justify-center items-center border border-mainColor rounded-2xl w-36 h-36 cursor-pointer
						${ !isButtonDisabled ? "hidden" : ""}`}>
						<Image alt="사진업로드아이콘" width={45} height={45} src="/images/AddImageIcon.png" />
				    </label>
					<input type="file" id="file" multiple accept=".jpg, .jpeg, .png" placeholder="제목을 작성해주세요" className="hidden" onChange={handleChange}/>
			</div>
		</div>
	);
}

export default AddImage;
