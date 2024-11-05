package com.fil.interceptor;

import com.fil.dto.Pagination;
import com.fil.interfaces.PaginationParams;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class PaginationParamsArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(PaginationParams.class) &&
                parameter.getParameterType().equals(Pagination.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        PaginationParams paginationParams = parameter.getParameterAnnotation(PaginationParams.class);

        int page = Integer.parseInt(webRequest.getParameter("page") != null ?
                webRequest.getParameter("page") : String.valueOf(paginationParams.defaultPage()));

        int size = Integer.parseInt(webRequest.getParameter("size") != null ?
                webRequest.getParameter("size") : String.valueOf(paginationParams.defaultSize()));

        return new Pagination(page, size);
    }
}
