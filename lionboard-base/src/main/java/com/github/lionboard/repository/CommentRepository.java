package com.github.lionboard.repository;

import com.github.lionboard.model.Comment;
import com.github.lionboard.model.CommentReport;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lion.k on 16. 1. 21..
 */

@Repository
public interface CommentRepository {
    List<Comment> findCommentsByPostId(Map<String, Object> cmtParam);

    void insertComment(Comment comment);

    void insertCommentStatus(Comment comment);

    List<Comment> findComments();

    void deleteAll();

    void updateCmtStatusByCmtId(Comment comment);

    Comment findCommentByCmtId(int cmtId);

    void updateCmtNumForInsertRow(Map<String, Integer> range);

    Integer getLikeCount(int cmtId);

    int addLikeCount(int cmtId);

    int subtractLikeCount(int cmtId);

    Integer getHateCount(int cmtId);

    int addHateCount(int cmtId);

    int subtractHateCount(int cmtId);

    void updateComment(Comment comment);

    int getReportCount(int cmtId);

    void insertReport(CommentReport commentReport);

    List<CommentReport> findReportByCmtId(int cmtId);

    void updateProcessStatus(CommentReport commentReport);

    List<Comment> findCommentsByUserId(int userId);

    void updateCmtStatusByPostId(Comment comment);

    List<Comment> findAll(HashMap<String, Object> params);

    int countAll();

    List<Comment> findCommentsByQuery(String query);

    List<CommentReport> findReportByQuery(String query);

    List<CommentReport> findAllReports(HashMap<String, Object> params);
}
