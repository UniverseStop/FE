import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function AddImage({ postImage, setpostImage }: { postImage: File[]; setpostImage: (postImage: File[]) => void }) {
	const [imagePreview, setImagePreview] = useState<File[]>([]);
	const [isButtonDisabled, setIsButtonDisabled] = useState<Boolean>(true);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (imagePreview.length >= 2) {
			setIsButtonDisabled(false);
		}
		const targetFiles = e.target.files as FileList;
		const selectedFiles: File[] = Array.from(targetFiles);

		setImagePreview((prev) => [...prev, ...selectedFiles]);

		return;
	};

	setpostImage(imagePreview);


	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">☝🏻표지에 쓰일 이미지를 골라주세요!</p>
			<div className="flex gap-3 ml-6">
				{imagePreview &&
					imagePreview.map((file, i) => (
						<div key={i}>
							<img
								className="rounded-2xl object-cover h-36 w-36"
								src={URL.createObjectURL(file)}
								alt={`image${i}`}
							/>
						</div>
					))}
				<label
					htmlFor="file"
					className={`flex justify-center items-center border border-mainColor rounded-2xl w-36 h-36 cursor-pointer ${
						!isButtonDisabled ? "pointer-events-none opacity-50" : ""
					}`}>
					<Image alt="사진업로드아이콘" width={45} height={45} src="/images/AddImageIcon.png" />
				</label>
				<input
					type="file"
					id="file"
					multiple
					accept=".jpg, .jpeg, .png"
					placeholder="제목을 작성해주세요"
					className="hidden"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}

export default AddImage;
