package com.github.lionboard.controller;

import com.github.lionboard.error.IncorrectAccessException;
import com.github.lionboard.model.Post;
import com.github.lionboard.model.PostFile;
import com.github.lionboard.service.LionBoardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Lion.k on 16. 2. 2..
 */

@Controller
@RequestMapping("/files")
public class FileController {
    @Autowired
    LionBoardService lionBoardService;

    private static final Logger logger =
            LoggerFactory.getLogger(FileController.class);

    @ResponseBody @RequestMapping(
            headers = "Accept=application/json",
            method= RequestMethod.POST)
    public String addFile(Post post) throws Exception {
        lionBoardService.addFileOnPost(post);
        return "success";
    }


    @ResponseBody
    @RequestMapping(method= RequestMethod.DELETE,
            value = "/{fileId}")
    public String removeFile(@PathVariable("fileId") int fileId){
        try {
            lionBoardService.changeFileStatusToDelete(fileId);
            return "success";
        }catch (RuntimeException e){
            return e.getMessage();
        }
    }

    @ExceptionHandler(Exception.class)
    public void IOException(Exception e) {
        logger.debug(e.getMessage());
    }
}