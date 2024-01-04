import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function AddImage() {
	const [images, setImages] = useState<string[]>([]);

	const handleChange = (e: React.ChangeEvent) => {
		const targetFiles = (e.target as HTMLInputElement).files as FileList;
		const selectedFiles: string[] = Array.from(targetFiles).map((file) => {
			return URL.createObjectURL(file);
		});
		setImages((prev) => prev.concat(selectedFiles));
	};

	return (
		<div>
			<p className="text-2xl font-bold m-6 0 6 6">☝🏻표지에 쓰일 이미지를 골라주세요!</p>
			<div className="flex ml-6">
				{images &&
					images.map((url, i) => (
						<div key={url}>
							<img className="rounded-2xl object-cover h-36 w-36" src={url} alt={`image${i}`} />
						</div>
					))}
				<label
					htmlFor="file"
					className="flex justify-center items-center border border-mainColor rounded-2xl w-36 h-36">
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
