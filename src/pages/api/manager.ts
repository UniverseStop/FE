import { ErrorResponse } from "@remix-run/router";
import { instance } from "./instance";

// 전체 사용자 조회 (차단된 사용자 제외)
export const getUserList = async (pageNum: number) => {
    try {
        const res = await instance.get(`/user/userList?page=${pageNum}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 유저별 신고 내역 조회
export const getUserReport = async (userId: number) => {
    try {
        const res = await instance.get(`/user/reportList/${userId}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 차단된 사용자 전체 조회
export const getBlackUserList = async (pageNum: number) => {
    try {
        const res = await instance.get(`/user/blackUser?page=${pageNum}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 사용자 차단
export const postBlackUser = async (userId: number) => {
    try {
        const res = await instance.post(`/user/black/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 사용자 구제 신청 사유 가져오기
export const getSalvationReason = async (userId: number) => {
    try {
        const res = await instance.get(`/api/salvation/${userId}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 사용자 구제
export const postSalvationUser = async (userId: number) => {
    try {
        const res = await instance.post(`/user/user/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// 사용자 통계
export const getStatic = async () => {
    try {
        const res = await instance.get(`/api/static`);
        console.log("res", res);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

// 정류장 위치 통계
export const getStaticLocation = async () => {
    try {
        const res = await instance.get(`/api/static/location`);
        console.log("StaticLocation", res);
        return res.data;
    } catch (error) {
        throw error;
    }
};

//사용자 검색 (관리자로 추가하기 위한 목적)
export const getAllUserList = async (nickname : string) => {
    try {
        const res = await instance.get(`/api/search?nickname=${nickname}`);
        return res
    } catch (error) {
        console.error("getAllUserList error:", error);
		throw error;
    }
}

//관리자 추가
export const postAddManager = async (nickname : string) => {
    try {
        const res = await instance.post(`/api/admin/up`, JSON.stringify({ nickname: nickname }), {
			headers: { "Content-Type": "application/json" },
		});
		return res;
	} catch (error) {
		console.error("postAddManager error:", error);
		throw error;
	}
}

//관리자 삭제
export const postDeleteManager = async (nickname : string) => {
    try {
        const res = await instance.post(`/api/admin/down`, JSON.stringify({ nickname: nickname }), {
			headers: { "Content-Type": "application/json" },
		});
		return res;
	} catch (error) {
		console.error("postDeleteManager error:", error);
		throw error;
	}
}

//관리자 목록
export const getManagerList = async () => {
    try {
        const res = await instance.get(`/api/admin`);
		return res.data.data;
	} catch (error) {
		console.error("getManagerList error:", error);
		throw error;
	}
}

//차단된 게시물 목록
export const getBlockPostList = async () => {
    try {
        const res = await instance.get(`/api/post/block`);
		return res.data.data;
	} catch (error) {
		console.error("getBlockPostList error:", error);
		throw error;
	}
}

//게시물 차단하기
export const postBlockDetailPost = async (postId : string) => {
    try {
        const res = await instance.post(`/api/post/block/${postId}`)
        return res
    } catch (error) {
        console.error("postBlockDetailPost error:", error);
		throw error;
    }
}

//게시물 차단해제
export const postBackBlockedlPost = async (postId : string) => {
    try {
        const res = await instance.post(`/api/post/unBlock/${postId}`)
        return res
    } catch (error) {
        console.error("postBackBlockedlPost error:", error);
		throw error;
    }
}

//차단된 게시물 영구삭제
export const deleteRemovePost = async (postId : string) => {
    try {
        const res = await instance.delete(`/api/post/block/${postId}`)
        return res
    } catch (error) {
        console.error("deleteRemovePost error:", error);
		throw error;
    }
}