package com.github.lionboard.controller;

import com.github.lionboard.service.IndexService;
import com.github.lionboard.model.TempModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by Lion.k on 16. 1. 12..
 */


@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private IndexService indexService;

    @RequestMapping(value = { "/", "/welcome" }, method = RequestMethod.GET)
    public String welcomePage(Model model) {
        List<TempModel> list = indexService.getPosts();
        model.addAttribute("tempModels", list);
        return "index";
    }

}