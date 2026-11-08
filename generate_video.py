import cv2
import numpy as np
import math

def render_ultra_humanized_chocolatier_hand():
    source_img_path = 'c:/Users/souhail/Desktop/Wigachoco/public/images/wigachoco-hero-placeholder.png'
    output_mp4_path = 'c:/Users/souhail/Desktop/Wigachoco/public/images/wigachoco-hero-video.mp4'
    
    bg = cv2.imread(source_img_path)
    if bg is None:
        raise ValueError("Cannot load source image")
    
    h, w = bg.shape[:2]
    fps = 30
    duration_sec = 8
    total_frames = fps * duration_sec
    
    # Target slot: bottom-right bonbon (column 4, row 3)
    ymin, ymax = 510, 628
    xmin, xmax = 770, 875
    target_cx = (xmin + xmax) // 2
    target_cy = (ymin + ymax) // 2
    
    bonbon_orig = bg[ymin:ymax, xmin:xmax].copy()
    bh, bw = bonbon_orig.shape[:2]
    
    # Precise chocolate mask
    mask = np.zeros((bh, bw), dtype=np.float32)
    cv2.ellipse(mask, (bw//2, bh//2), (bw//2 - 5, bh//2 - 5), 0, 0, 360, 1.0, -1)
    mask = cv2.GaussianBlur(mask, (9, 9), 2.5)
    
    # Empty background: corrugated paper cup liner with dark interior depth
    empty_bg = bg.copy()
    liner_dark = np.array([28, 20, 32], dtype=np.uint8)
    empty_slot = np.full_like(bonbon_orig, liner_dark)
    # Fluted cup ridges & depth gradient
    for ang in range(0, 360, 15):
        rad = math.radians(ang)
        x1 = int(bw//2 + (bw//2 - 12) * math.cos(rad))
        y1 = int(bh//2 + (bh//2 - 12) * math.sin(rad))
        x2 = int(bw//2 + (bw//2 - 4) * math.cos(rad))
        y2 = int(bh//2 + (bh//2 - 4) * math.sin(rad))
        cv2.line(empty_slot, (x1, y1), (x2, y2), (20, 15, 24), 1)
    cv2.ellipse(empty_slot, (bw//2, bh//2), (bw//2 - 12, bh//2 - 12), 0, 0, 360, (14, 10, 18), -1)
    empty_slot = cv2.GaussianBlur(empty_slot, (7, 7), 2)
    
    for c in range(3):
        empty_bg[ymin:ymax, xmin:xmax, c] = (
            empty_slot[:, :, c] * mask + empty_bg[ymin:ymax, xmin:xmax, c] * (1.0 - mask)
        ).astype(np.uint8)
        
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(output_mp4_path, fourcc, fps, (w, h))
    if not out.isOpened():
        raise RuntimeError("Failed to open H264 VideoWriter")
    
    # Photorealistic human skin tones (Moroccan/Mediterranean artisan warm complexion)
    # BGR format:
    skin_base = np.array([168, 195, 228], dtype=np.float32)    # Warm peach/olive skin
    skin_shadow = np.array([110, 138, 175], dtype=np.float32)  # Ambient anatomical shadow
    skin_highlight = np.array([205, 228, 245], dtype=np.float32) # Soft culinary overhead studio specular
    nail_color = np.array([180, 195, 222], dtype=np.uint8)     # Natural clean manicured nail
    cuff_color = np.array([245, 248, 250], dtype=np.uint8)     # White chef jacket cuff
    
    for f in range(total_frames):
        t = f / fps
        
        # Base frame (empty slot before chocolate release at 4.2s)
        if t < 4.2:
            frame = empty_bg.copy()
        else:
            frame = bg.copy()
            
        # Subtle slow organic breathing camera (cinematic handheld micro-motion)
        cam_dx = 1.5 * math.sin(f * 0.05)
        cam_dy = 1.2 * math.cos(f * 0.04)
        M_cam = np.float32([[1, 0, cam_dx], [0, 1, cam_dy]])
        frame = cv2.warpAffine(frame, M_cam, (w, h), borderMode=cv2.BORDER_REFLECT)
        
        # Hand & Chocolate motion trajectory
        if 0.8 <= t < 6.4:
            if t < 4.0:
                # Descending ease curve with organic micro-hesitation
                p = (t - 0.8) / (4.0 - 0.8)
                # Cubic bezier-like ease in-out
                ease_p = 3 * p**2 - 2 * p**3
                # Natural human micro-tremor of concentration (haute précision)
                tremor_x = 0.8 * math.sin(f * 0.4) * (1.0 - ease_p)
                tremor_y = 0.6 * math.cos(f * 0.35) * (1.0 - ease_p)
                
                curr_cx = int(w * 0.96 + (target_cx - w * 0.96) * ease_p + tremor_x)
                curr_cy = int(h * 0.16 + (target_cy - h * 0.16) * ease_p + tremor_y)
                scale = 1.22 - 0.22 * ease_p
                hand_opacity = min(1.0, (t - 0.8) / 0.45)
                grip_open = 0.0 # holding tightly
            elif t < 4.5:
                # Chocolate settles into slot, fingers release gently (open slightly)
                curr_cx = target_cx
                curr_cy = target_cy
                scale = 1.0
                hand_opacity = 1.0
                grip_open = min(1.0, (t - 4.0) / 0.5) * 12.0 # fingers spread outward by 12px
            else:
                # Hand gently glides away upward-right
                p = (t - 4.5) / (6.4 - 4.5)
                ease_p = p**1.8
                curr_cx = int(target_cx + (w * 1.04 - target_cx) * ease_p)
                curr_cy = int(target_cy - (target_cy - h * 0.12) * ease_p)
                scale = 1.0 + 0.12 * ease_p
                hand_opacity = max(0.0, 1.0 - (t - 5.6) / 0.8)
                grip_open = 14.0 # relaxed open hand
                
            # Render chocolate bonbon while held in fingers
            if t < 4.2:
                sbw = int(bw * scale)
                sbh = int(bh * scale)
                s_bonbon = cv2.resize(bonbon_orig, (sbw, sbh), interpolation=cv2.INTER_LINEAR)
                s_mask = cv2.resize(mask, (sbw, sbh), interpolation=cv2.INTER_LINEAR)
                
                # Organic cast shadow of the descending chocolate onto the box
                h_dist = target_cy - curr_cy
                if h_dist > 0:
                    shadow_alpha = max(0.0, min(0.65, 1.0 - h_dist / 220.0))
                    cv2.ellipse(frame, (target_cx, target_cy + 8), 
                                (int(bw * 0.48), int(bh * 0.32)), 0, 0, 360, (16, 12, 18), -1)
                
                bx1 = curr_cx - sbw // 2
                by1 = curr_cy - sbh // 2
                bx2 = bx1 + sbw
                by2 = by1 + sbh
                
                if 0 <= bx1 and bx2 <= w and 0 <= by1 and by2 <= h:
                    roi = frame[by1:by2, bx1:bx2]
                    for c in range(3):
                        roi[:, :, c] = (s_bonbon[:, :, c] * s_mask + roi[:, :, c] * (1.0 - s_mask)).astype(np.uint8)
                    frame[by1:by2, bx1:bx2] = roi

            # Render HUMANIZED artisan hand (natural skin, knuckle shading, realistic fingers)
            if hand_opacity > 0:
                hand_layer = np.zeros_like(frame, dtype=np.uint8)
                hand_mask = np.zeros((h, w), dtype=np.float32)
                
                # Finger anatomy:
                # Thumb (left side):
                thumb_tip = (curr_cx - int((26 + grip_open) * scale), curr_cy - int((22 - grip_open*0.4) * scale))
                thumb_joint = (curr_cx - int(48 * scale), curr_cy - int(70 * scale))
                
                # Index finger (right side):
                index_tip = (curr_cx + int((24 + grip_open) * scale), curr_cy - int((24 - grip_open*0.3) * scale))
                index_pip = (curr_cx + int((38 + grip_open*0.5) * scale), curr_cy - int(65 * scale))
                index_knuckle = (curr_cx + int(60 * scale), curr_cy - int(105 * scale))
                
                # Middle finger (slightly arched above index):
                middle_tip = (curr_cx + int((34 + grip_open) * scale), curr_cy - int(38 * scale))
                middle_knuckle = (curr_cx + int(85 * scale), curr_cy - int(120 * scale))
                
                # Palm & Wrist:
                wrist_left = (curr_cx + int(150 * scale), curr_cy - int(240 * scale))
                wrist_right = (curr_cx + int(260 * scale), curr_cy - int(200 * scale))
                
                # Draw finger segments onto hand_mask
                # Thumb
                cv2.line(hand_mask, thumb_joint, thumb_tip, 1.0, int(22 * scale))
                cv2.circle(hand_mask, thumb_tip, int(11 * scale), 1.0, -1)
                
                # Index finger
                cv2.line(hand_mask, index_knuckle, index_pip, 1.0, int(20 * scale))
                cv2.line(hand_mask, index_pip, index_tip, 1.0, int(18 * scale))
                cv2.circle(hand_mask, index_tip, int(9 * scale), 1.0, -1)
                
                # Middle finger
                cv2.line(hand_mask, middle_knuckle, middle_tip, 1.0, int(19 * scale))
                cv2.circle(hand_mask, middle_tip, int(9 * scale), 1.0, -1)
                
                # Palm polygon
                palm = np.array([
                    thumb_joint,
                    (curr_cx - int(30 * scale), curr_cy - int(130 * scale)),
                    wrist_left,
                    wrist_right,
                    middle_knuckle,
                    index_knuckle,
                    thumb_joint
                ], np.int32)
                cv2.fillConvexPoly(hand_mask, palm, 1.0)
                
                # Smooth the anatomical silhouette
                hand_mask = cv2.GaussianBlur(hand_mask, (15, 15), 4) * hand_opacity
                
                # Photorealistic 3D cylindrical skin shading with lighting:
                for y_coord in range(max(0, curr_cy - int(280 * scale)), min(h, curr_cy + int(20 * scale))):
                    for x_coord in range(max(0, curr_cx - int(80 * scale)), min(w, curr_cx + int(280 * scale))):
                        m_val = hand_mask[y_coord, x_coord]
                        if m_val > 0.02:
                            # Distance vector to studio light source (overhead-left)
                            lx = (x_coord - curr_cx) / float(180 * scale)
                            ly = (y_coord - (curr_cy - 120 * scale)) / float(180 * scale)
                            
                            # Specular / Diffuse lighting blend
                            diffuse = np.clip(0.5 - lx * 0.4 - ly * 0.3, 0.0, 1.0)
                            color = (skin_shadow * (1.0 - diffuse) + skin_base * diffuse).astype(np.uint8)
                            
                            # Knuckle highlights
                            if abs(x_coord - index_pip[0]) < 12 and abs(y_coord - index_pip[1]) < 12:
                                color = skin_highlight.astype(np.uint8)
                                
                            hand_layer[y_coord, x_coord] = color
                            
                # Add manicured fingernails for human realism:
                if hand_opacity > 0.5:
                    cv2.ellipse(hand_layer, thumb_tip, (int(6*scale), int(8*scale)), -30, 0, 360, nail_color.tolist(), -1)
                    cv2.ellipse(hand_layer, index_tip, (int(5*scale), int(7*scale)), 25, 0, 360, nail_color.tolist(), -1)
                
                # Chef uniform sleeve cuff (crisp white linen)
                cuff_poly = np.array([
                    (wrist_left[0] - int(10*scale), wrist_left[1] - int(15*scale)),
                    (wrist_right[0] + int(20*scale), wrist_right[1] - int(25*scale)),
                    (w, wrist_right[1] - int(60*scale)),
                    (w, wrist_left[1] - int(60*scale))
                ], np.int32)
                cv2.fillConvexPoly(hand_layer, cuff_poly, cuff_color.tolist())
                # Add cuff edge stitch shadow
                cv2.line(hand_layer, (wrist_left[0] - int(10*scale), wrist_left[1] - int(15*scale)),
                         (wrist_right[0] + int(20*scale), wrist_right[1] - int(25*scale)), (200, 205, 210), int(3*scale))
                
                # Blend hand layer into scene
                for c in range(3):
                    frame[:, :, c] = (hand_layer[:, :, c] * hand_mask + frame[:, :, c] * (1.0 - hand_mask)).astype(np.uint8)
                    
        # Elegant golden gleam / shimmer upon completed placement
        if 4.2 <= t <= 6.0:
            st = (t - 4.2) / 1.8
            sparkle_intensity = math.sin(st * math.pi)
            if sparkle_intensity > 0.05:
                sx, sy = target_cx - 5, target_cy - 12
                # Golden warm glow
                cv2.circle(frame, (sx, sy), int(12 * sparkle_intensity + 3), (110, 205, 250), -1)
                flare_len = int(24 * sparkle_intensity)
                cv2.line(frame, (sx - flare_len, sy), (sx + flare_len, sy), (210, 240, 255), 2)
                cv2.line(frame, (sx, sy - flare_len), (sx, sy + flare_len), (210, 240, 255), 2)
                
        out.write(frame)
        
    out.release()
    print("Humanized video rendered successfully:", output_mp4_path)

if __name__ == '__main__':
    render_ultra_humanized_chocolatier_hand()
