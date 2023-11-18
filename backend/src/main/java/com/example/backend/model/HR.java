package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class HR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hrId")
    private int hrId;

    @Column(name = "name")
    private String name;

    @Column(name = "contact")
    private String contact;

    @Column(name = "email", unique = true)
    private String email;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyId" )
    private Company company;


    public HR(String name, String contact,String email,Company company){
        this.company=company;
        this.contact=contact;
        this.name=name;
        this.email=email;
    }

    @Override
//    public Boolean equals(Object other){
//        return true;
//    }

    public boolean equals(Object otherHr){
        if(!( otherHr instanceof HR))return false;
        HR other = (HR)otherHr;
        System.out.println("comparing hrs in equals:"+ other.getName() + " and "+ this.name);
        if(this.email.equals(other.email) ||
           this.contact.equals(other.contact)
        )return true;
        return false;
    }
}
