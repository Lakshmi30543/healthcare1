package com.sdp.health.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Patients")
public class Patient extends User {

    @Column(name = "bloodGroup", nullable = false, length = 10)
    private String bloodGroup;

    @Column(name = "address", nullable = false, length = 100)
    private String address;
    
    @Column(name = "profilePictureUrl", length = 255, nullable = true)
    private String profilePictureUrl;

	public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

}